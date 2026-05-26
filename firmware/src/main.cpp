#include <FastLED.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

// Pins
#define LED_PIN_A 23
#define LED_PIN_B 18
#define HALL_SENSOR_PIN 4
#define NUM_LEDS_PER_ARM 44

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

AsyncWebServer server(80);

void IRAM_ATTR hallISR() {
    static unsigned long lastISR = 0;
    unsigned long now = millis();
    if(now - lastISR < 50) return; // Debounce
    
    unsigned long interval = now - lastISR;
    pulseIntervals[pulseIdx] = interval;
    pulseIdx = (pulseIdx + 1) % 5;
    
    lastPulseTime[0] = now;
    lastISR = now;
}

// ... inside setup, updated API: Config
    server.on("/config", HTTP_POST, [](AsyncWebServerRequest *request){}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, data);
        if (error) {
            request->send(400, "text/plain", "Invalid JSON");
            return;
        }
        
        int numLEDs = doc["numLEDs"].as<int>();
        int dataPin = doc["dataPin"].as<int>();
        if (numLEDs <= 0 || numLEDs > 500 || dataPin < 0 || dataPin > 40) {
            request->send(400, "text/plain", "Invalid config values");
            return;
        }

        currentPattern = doc["pattern"].as<String>();
        textSpeed = doc["speed"].as<int>();
        intensity = doc["intensity"].as<int>();
        long colorVal = strtol(doc["color"].as<String>().substring(1).c_str(), NULL, 16);
        patternColor = CRGB(colorVal >> 16, (colorVal >> 8) & 0xFF, colorVal & 0xFF);
        request->send(200, "text/plain", "OK");
    });
// ...

void loop() {
    float avgInterval = 0;
    for(int i=0; i<5; i++) avgInterval += pulseIntervals[i];
    avgInterval /= 5;
    
    float phase = avgInterval > 0 ? (float)(millis() - lastPulseTime[0]) / avgInterval : 0;
    if (phase > 1.0) phase = 0;

    FastLED.clear();
    for (int i = 0; i < NUM_LEDS_PER_ARM; i++) {
        if (currentPattern == "Psychedelic Flow") {
            byte hue = (i * 2) + (phase * 255);
            armA[i] = CHSV(hue, 255, intensity * 2.5);
            armB[i] = CHSV(hue + 128, 255, intensity * 2.5);
        } else if (currentPattern == "Hypno Pulse") {
            float val = sin(i * 0.2 + phase * 6.28) * 127 + 128;
            armA[i] = CRGB(val * intensity/100, 0, val * intensity/100);
            armB[i] = CRGB(val * intensity/100, 0, val * intensity/100);
        } else if (currentPattern == "Vortex Flash") {
             float angle = atan2(i - 22, 22) * 57.29 + phase * 360;
             armA[i] = ColorFromPalette(RainbowColors_p, angle);
             armB[i] = ColorFromPalette(RainbowColors_p, angle + 128);
        } else {
             // Default
             if (i < 44 * phase) armA[i] = patternColor;
             if (i < 44 * phase) armB[i] = patternColor;
        }
        armA[i].fadeToBlackBy(255 - intensity * 2.5);
        armB[i].fadeToBlackBy(255 - intensity * 2.5);
    }
    FastLED.show();
    delay(5);
}

