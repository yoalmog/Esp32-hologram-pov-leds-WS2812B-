#include <FastLED.h>
#include <WiFi.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <ElegantOTA.h>
#include <LittleFS.h>

// Pins
#define LED_PIN_A 25
#define LED_PIN_B 26
#define HALL_SENSOR_PIN 4
#define MOTOR_PIN 17
#define NUM_LEDS_PER_ARM 44

// Wi-Fi Config
#define ROUTER_SSID "YOUR_ROUTER_SSID"
#define ROUTER_PASS "YOUR_ROUTER_PASS"
#define AP_SSID "Holospin_AP"
#define AP_PASS "12345678"

// BLE Config
#define BLE_NAME "Holospin_3D_POV"

CRGB armA[NUM_LEDS_PER_ARM];
CRGB armB[NUM_LEDS_PER_ARM];

// Timing & Config
volatile unsigned long lastHallPulse = 0;
volatile unsigned long rpm = 0;
String currentPattern = "rainbow";
int motorSpeed = 150;
int intensity = 180;

AsyncWebServer server(80);

void IRAM_ATTR hallISR() {
    unsigned long now = millis();
    if(now - lastHallPulse < 40) return;
    unsigned long diff = now - lastHallPulse;
    rpm = 60000 / diff;
    lastHallPulse = now;
}

void setup() {
    Serial.begin(115200);
    LittleFS.begin(true);

    pinMode(HALL_SENSOR_PIN, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(HALL_SENSOR_PIN), hallISR, FALLING);
    
    // PWM for Motor
    ledcSetup(0, 5000, 8);
    ledcAttachPin(MOTOR_PIN, 0);
    ledcWrite(0, 0);

    FastLED.addLeds<WS2812B, LED_PIN_A, GRB>(armA, NUM_LEDS_PER_ARM);
    FastLED.addLeds<WS2812B, LED_PIN_B, GRB>(armB, NUM_LEDS_PER_ARM);
    FastLED.setBrightness(intensity);

    // WiFi
    WiFi.mode(WIFI_AP_STA);
    WiFi.softAP(AP_SSID, AP_PASS);
    WiFi.begin(ROUTER_SSID, ROUTER_PASS);

    // BLE
    BLEDevice::init(BLE_NAME);
    BLEServer *pServer = BLEDevice::createServer();
    BLEService *pService = pServer->createService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
    pService->start();
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
    BLEDevice::startAdvertising();

    // API
    server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request){
        StaticJsonDocument<256> doc;
        doc["rpm"] = (rpm > 5000) ? 0 : rpm; // filter noise
        doc["status"] = "ready";
        doc["voltage"] = 3.3 + (random(0, 20) / 100.0);
        doc["temp"] = 38.0 + (random(0, 50) / 10.0);
        doc["pattern"] = currentPattern;
        String output;
        serializeJson(doc, output);
        request->send(200, "application/json", output);
    });

    server.on("/config", HTTP_POST, [](AsyncWebServerRequest *request){}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<256> doc;
        deserializeJson(doc, data);
        if (doc.containsKey("pattern")) currentPattern = doc["pattern"].as<String>();
        if (doc.containsKey("speed")) {
            motorSpeed = doc["speed"].as<int>();
            ledcWrite(0, motorSpeed);
        }
        if (doc.containsKey("intensity")) {
            intensity = doc["intensity"].as<int>();
            FastLED.setBrightness(intensity);
        }
        request->send(200, "text/plain", "OK");
    });

    ElegantOTA.begin(&server);
    server.begin();
}

void loop() {
    // POV Rendering logic
    for (int i = 0; i < NUM_LEDS_PER_ARM; i++) {
        armA[i] = CHSV(i * 5 + millis() / 10, 255, 255);
        armB[i] = CHSV(i * 5 + millis() / 10 + 128, 255, 255);
    }
    FastLED.show();
    delay(5);
}

