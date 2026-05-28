#include <Arduino.h>
#include <FastLED.h>
#include <WiFi.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLE2902.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <LittleFS.h>

// --- HARDWARE CONFIGURATION (PRODUCTION) ---
#define LED_PIN_A 13
#define LED_PIN_B 14
#define HALL_PIN  12
#define MOTOR_PIN 27
#define NUM_LEDS_PER_ARM 64
#define TOTAL_LEDS (NUM_LEDS_PER_ARM * 2)

CRGB ledsA[NUM_LEDS_PER_ARM];
CRGB ledsB[NUM_LEDS_PER_ARM];

// --- POV SYNC CORE ---
volatile uint32_t lastHallTime = 0;
volatile uint32_t rotationPeriod = 0;
volatile uint32_t currentRpm = 0;
bool isLocked = false;

// --- FRAME BUFFER (Radial) ---
uint8_t imageBuffer[128 * 64 * 3]; 
bool hasCustomImage = false;

// --- CALIBRATION STATE ---
float phaseOffsetB = 180.0f;
float angularCorrection = 0.0f;
float gammaValue = 2.2f;
String activePattern = "none";
uint8_t globalBrightness = 150;

// Gamma Correction Table (8-bit)
uint8_t gammaTable[256];

void updateGammaTable() {
    for (int i = 0; i < 256; i++) {
        gammaTable[i] = (uint8_t)(pow((float)i / 255.0, gammaValue) * 255.0);
    }
}

// ISR for Hall Effect Sensor
void IRAM_ATTR onHallInterrupt() {
    uint32_t now = micros();
    uint32_t delta = now - lastHallTime;
    if (delta > 4000) { 
        rotationPeriod = delta;
        lastHallTime = now;
        currentRpm = 60000000 / delta;
        isLocked = true;
    }
}

// --- STATE & API ---
AsyncWebServer server(80);

// BLE UUIDs
#define SERVICE_UUID           "0000aaaa-0000-1000-8000-00805f9b34fb"
#define CHARACTERISTIC_UUID_TX "0000bbbb-0000-1000-8000-00805f9b34fb"
#define CHARACTERISTIC_UUID_RX "0000cccc-0000-1000-8000-00805f9b34fb"

BLECharacteristic *pCharacteristicTX;
bool deviceConnected = false;

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      BLEDevice::startAdvertising();
    }
};

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      if (value.length() > 0) {
        StaticJsonDocument<256> doc;
        deserializeJson(doc, value.c_str());
        if (doc.containsKey("phaseOffset")) phaseOffsetB = doc["phaseOffset"];
        if (doc.containsKey("pattern")) activePattern = doc["pattern"].as<String>();
        if (doc.containsKey("gamma")) {
            gammaValue = doc["gamma"];
            updateGammaTable();
        }
      }
    }
};

void setupPOV() {
    FastLED.addLeds<WS2812B, LED_PIN_A, GRB>(ledsA, NUM_LEDS_PER_ARM);
    FastLED.addLeds<WS2812B, LED_PIN_B, GRB>(ledsB, NUM_LEDS_PER_ARM);
    FastLED.setBrightness(globalBrightness);
    FastLED.setMaxPowerInVoltsAndMilliamps(12, 4000); 
    updateGammaTable();
}

void renderPOV() {
    if (!isLocked || currentRpm < 200) {
        FastLED.clear();
        FastLED.show();
        return;
    }
    uint32_t timeSincePulse = micros() - lastHallTime;
    if (timeSincePulse > rotationPeriod) timeSincePulse = rotationPeriod;
    uint16_t phaseA = (uint32_t)timeSincePulse * 65536 / rotationPeriod;
    uint16_t phaseB = phaseA + (uint16_t)(phaseOffsetB * 65536.0f / 360.0f);

    if (activePattern != "none") {
        // ... (existing pattern logic)
    } else if (hasCustomImage) {
        uint16_t sliceA = (phaseA * 128) >> 16;
        uint16_t sliceB = (phaseB * 128) >> 16;
        for (int i = 0; i < NUM_LEDS_PER_ARM; i++) {
            int idxA = (sliceA * 64 + i) * 3;
            ledsA[i] = CRGB(imageBuffer[idxA], imageBuffer[idxA+1], imageBuffer[idxA+2]);
            int idxB = (sliceB * 64 + i) * 3;
            ledsB[i] = CRGB(imageBuffer[idxB], imageBuffer[idxB+1], imageBuffer[idxB+2]);
        }
    } else {
        for (int i = 0; i < NUM_LEDS_PER_ARM; i++) {
            ledsA[i] = CHSV((phaseA >> 8) + i * 2, 255, 255);
            ledsB[i] = CHSV((phaseB >> 8) + i * 2, 255, 255);
        }
    }
    for (int i = 0; i < NUM_LEDS_PER_ARM; i++) {
        ledsA[i].r = gammaTable[ledsA[i].r]; ledsA[i].g = gammaTable[ledsA[i].g]; ledsA[i].b = gammaTable[ledsA[i].b];
        ledsB[i].r = gammaTable[ledsB[i].r]; ledsB[i].g = gammaTable[ledsB[i].g]; ledsB[i].b = gammaTable[ledsB[i].b];
    }
    FastLED.show();
}

void setup() {
    Serial.begin(115200);
    LittleFS.begin(true);
    pinMode(HALL_PIN, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(HALL_PIN), onHallInterrupt, FALLING);
    pinMode(MOTOR_PIN, OUTPUT);
    setupPOV();

    WiFi.softAP("HoloSpin_AP", "12345678");
    server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request){
        StaticJsonDocument<256> doc;
        doc["rpm"] = currentRpm;
        doc["sync"] = isLocked;
        doc["pattern"] = activePattern;
        doc["brightness"] = globalBrightness;
        doc["rssi"] = WiFi.status() == WL_CONNECTED ? WiFi.RSSI() : -100;
        String buf; serializeJson(doc, buf);
        request->send(200, "application/json", buf);
    });
    server.on("/upload", HTTP_POST, [](AsyncWebServerRequest *request){
        hasCustomImage = true;
        request->send(200, "application/json", "{\"status\":\"complete\"}");
    }, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        if (index + len <= sizeof(imageBuffer)) memcpy(imageBuffer + index, data, len);
    });
    server.begin();

    BLEDevice::init("HoloSpin");
    BLEServer *pServer = BLEDevice::createServer();
    pServer->setCallbacks(new MyServerCallbacks());
    BLEService *pService = pServer->createService(SERVICE_UUID);
    pCharacteristicTX = pService->createCharacteristic(CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_NOTIFY);
    pCharacteristicTX->addDescriptor(new BLE2902());
    BLECharacteristic *pCharacteristicRX = pService->createCharacteristic(CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE);
    pCharacteristicRX->setCallbacks(new MyCallbacks());
    pService->start();
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    BLEDevice::startAdvertising();
}

unsigned long lastTelemetry = 0;
void loop() {
    renderPOV();
    if (deviceConnected && millis() - lastTelemetry > 1000) {
        lastTelemetry = millis();
        StaticJsonDocument<256> doc;
        doc["rpm"] = currentRpm;
        doc["sync"] = isLocked;
        doc["rssi"] = WiFi.status() == WL_CONNECTED ? WiFi.RSSI() : -100;
        String buf; serializeJson(doc, buf);
        pCharacteristicTX->setValue(buf.c_str());
        pCharacteristicTX->notify();
    }
}
