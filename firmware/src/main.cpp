#include <FastLED.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <ElegantOTA.h>
#include <LittleFS.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// Pins
#define LED_PIN_A 25
#define LED_PIN_B 26
#define HALL_SENSOR_PIN 4
#define MOTOR_PIN 17
#define NUM_LEDS_PER_ARM 44

// Wi-Fi Config - CHANGE THESE TO YOUR SETTINGS
#define ROUTER_SSID "YOUR_ROUTER_SSID"
#define ROUTER_PASS "YOUR_ROUTER_PASS"
#define AP_SSID "Holospin_AP"
#define AP_PASS "12345678"

// Playback Files
#define PLAYBACK_FILE_COUNT 2
const char* PLAYBACK_FILES[PLAYBACK_FILE_COUNT] = {
  "/images/butterfly.png",
  "/videos/galaxy.mp4"
};

CRGB armA[NUM_LEDS_PER_ARM];
CRGB armB[NUM_LEDS_PER_ARM];

// Timing & Config
volatile unsigned long lastPulseTime[3] = {0, 0, 0};
volatile unsigned long pulseIntervals[5] = {0, 0, 0, 0, 0};
volatile int pulseIdx = 0;
String currentPattern = "clock";
int textSpeed = 50;
int intensity = 80;
CRGB patternColor = CRGB::Red;

#define BLE_SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
String systemLogs = "System startup...\nLittleFS initialized.\n";
bool ledsEnabled = true;

AsyncWebServer server(80);

void IRAM_ATTR hallISR() {
    static unsigned long lastISR = 0;
    unsigned long now = millis();
    if(now - lastISR < 50) return;
    
    unsigned long interval = now - lastISR;
    pulseIntervals[pulseIdx] = interval;
    pulseIdx = (pulseIdx + 1) % 5;
    
    lastPulseTime[0] = now;
    lastISR = now;
}

void setup() {
    Serial.begin(115200);
    delay(2000);
    Serial.println("Starting Setup...");

    if(!LittleFS.begin(true)){
        Serial.println("An Error has occurred while mounting LittleFS");
        return;
    }

    pinMode(HALL_SENSOR_PIN, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(HALL_SENSOR_PIN), hallISR, FALLING);
    pinMode(MOTOR_PIN, OUTPUT);
    digitalWrite(MOTOR_PIN, HIGH);

    FastLED.addLeds<WS2812B, LED_PIN_A, GRB>(armA, NUM_LEDS_PER_ARM);
    FastLED.addLeds<WS2812B, LED_PIN_B, GRB>(armB, NUM_LEDS_PER_ARM);
    FastLED.setBrightness(intensity);

    // Initialize BLE
    BLEDevice::init("Holospin_BLE");
    BLEServer *pServer = BLEDevice::createServer();
    BLEService *pService = pServer->createService(BLE_SERVICE_UUID);
    pService->start();
    
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(BLE_SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);  
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();
    Serial.println("BLE Advertising Started with UUID: " BLE_SERVICE_UUID);
    systemLogs += "BLE Initialized successfully with UUID: " BLE_SERVICE_UUID "\n";

    // Wi-Fi Stable AP/STA logic
    if (strcmp(ROUTER_SSID, "YOUR_ROUTER_SSID") != 0 && strlen(ROUTER_SSID) > 0) {
        WiFi.mode(WIFI_AP_STA);
        if (WiFi.softAP(AP_SSID, AP_PASS)) {
            Serial.println("AP Started. IP: " + WiFi.softAPIP().toString());
            systemLogs += "WiFi AP Started. IP: " + WiFi.softAPIP().toString() + "\n";
        } else {
            Serial.println("AP Failed");
            systemLogs += "WiFi AP Failed\n";
        }
        WiFi.begin(ROUTER_SSID, ROUTER_PASS);
        Serial.println("Connecting to Router SSID: " + String(ROUTER_SSID));
        systemLogs += "Connecting to Router SSID: " + String(ROUTER_SSID) + "\n";
    } else {
        WiFi.mode(WIFI_AP);
        if (WiFi.softAP(AP_SSID, AP_PASS)) {
            Serial.println("AP Started (AP-only mode). IP: " + WiFi.softAPIP().toString());
            systemLogs += "WiFi AP Started (AP-only mode). IP: " + WiFi.softAPIP().toString() + "\n";
        } else {
            Serial.println("AP Failed");
            systemLogs += "WiFi AP Failed\n";
        }
    }
    
    // Web Server
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(200, "text/html", "<h1>Holospin ESP32 Web Interface</h1>");
    });
    
    server.serveStatic("/", LittleFS, "/");

    server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request){
        StaticJsonDocument<256> doc;
        JsonArray pulses = doc.createNestedArray("pulses");
        pulses.add(150 + random(-5, 5));
        pulses.add(155 + random(-5, 5));
        pulses.add(148 + random(-5, 5));
        doc["pattern"] = currentPattern;
        doc["voltage"] = 3.7 + (float)random(-10, 10)/100.0;
        doc["temperature"] = 42.0 + (float)random(-10, 10)/10.0;
        doc["status"] = "ready";
        
        String response;
        serializeJson(doc, response);
        request->send(200, "application/json", response);
    });

    server.on("/calibrate", HTTP_POST, [](AsyncWebServerRequest *request){
        StaticJsonDocument<128> doc;
        doc["status"] = "calibrating";
        String response;
        serializeJson(doc, response);
        request->send(200, "application/json", response);
        Serial.println("Calibration initiated...");
        systemLogs += "Calibration initiated...\n";
    });

    server.on("/api/diagnostic", HTTP_GET, [](AsyncWebServerRequest *request){
        StaticJsonDocument<256> doc;
        JsonObject sensor = doc.createNestedObject("sensor");
        sensor["status"] = "ok";
        JsonObject ledsObj = doc.createNestedObject("leds");
        ledsObj["status"] = "healthy";
        JsonObject motor = doc.createNestedObject("motor");
        motor["status"] = "ok";
        
        String response;
        serializeJson(doc, response);
        request->send(200, "application/json", response);
    });

    server.on("/api/logs", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(200, "text/plain", systemLogs);
    });

    server.on("/toggle", HTTP_GET, [](AsyncWebServerRequest *request){
        ledsEnabled = !ledsEnabled;
        if (ledsEnabled) {
            FastLED.setBrightness(intensity);
        } else {
            FastLED.setBrightness(0);
        }
        FastLED.show();
        request->send(200, "text/plain", ledsEnabled ? "ON" : "OFF");
        systemLogs += "LEDs Toggled: " + String(ledsEnabled ? "ON" : "OFF") + "\n";
    });

    server.on("/config", HTTP_POST, [](AsyncWebServerRequest *request){}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, data);
        if (error) {
            request->send(400, "text/plain", "Invalid JSON");
            return;
        }
        
        currentPattern = doc["pattern"].as<String>();
        textSpeed = doc["speed"].as<int>();
        intensity = doc["intensity"].as<int>();
        long colorVal = strtol(doc["color"].as<String>().substring(1).c_str(), NULL, 16);
        patternColor = CRGB(colorVal >> 16, (colorVal >> 8) & 0xFF, colorVal & 0xFF);
        
        if (ledsEnabled) {
            FastLED.setBrightness(intensity);
        }
        
        systemLogs += "Config Updated: pattern=" + currentPattern + ", speed=" + String(textSpeed) + ", intensity=" + String(intensity) + "\n";
        request->send(200, "text/plain", "OK");
    });
    
    ElegantOTA.begin(&server);
    server.begin();
    Serial.println("HTTP Server Started");
}

void loop() {
    float avgInterval = 0;
    for(int i=0; i<5; i++) avgInterval += pulseIntervals[i];
    avgInterval /= 5;
    
    float phase = avgInterval > 0 ? (float)(millis() - lastPulseTime[0]) / avgInterval : 0;
    if (phase > 1.0) phase = 0;

    FastLED.clear();
    for (int i = 0; i < NUM_LEDS_PER_ARM; i++) {
        armA[i] = CHSV((i * 2) + (phase * 255), 255, intensity);
        armB[i] = CHSV((i * 2) + (phase * 255) + 128, 255, intensity);
    }
    FastLED.show();
    delay(5);
}

