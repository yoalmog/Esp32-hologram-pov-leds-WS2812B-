#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <WebServer.h>
#include <ElegantOTA.h>
#include <NeoPixelBus.h>
#include <ArduinoJson.h>
#include "Config.h"

// =====================================================
// LED STRIPS
// =====================================================

NeoPixelBus<NeoGrbFeature, NeoEsp32Rmt0Ws2812xMethod>
strip1(PIXEL_COUNT, PIN_STRIP1);

NeoPixelBus<NeoGrbFeature, NeoEsp32Rmt1Ws2812xMethod>
strip2(PIXEL_COUNT, PIN_STRIP2);

// =====================================================
// SERVER
// =====================================================

WebServer server(80);

// =====================================================
// GLOBALS & EFFECTS DEF
// =====================================================

bool ledState = true;
uint8_t ledR = 255;
uint8_t ledG = 0;
uint8_t ledB = 0;
bool bluetoothConnected = false; // HC-05 classic status connection

enum EffectType {
    EFFECT_CLOCK,
    EFFECT_RAINBOW,
    EFFECT_FIRE,
    EFFECT_MATRIX,
    EFFECT_HYPNO,
    EFFECT_SPACE,
    EFFECT_MANDALA,
    EFFECT_ACID,
    EFFECT_PLASMA,
    EFFECT_PORTAL,
    EFFECT_DNA,
    EFFECT_MUSHROOMS,
    EFFECT_ALIEN,
    EFFECT_CUBE3D,
    EFFECT_KALEIDO,
    EFFECT_VIDEO_SYNTH,
    EFFECT_ANIME_FLOW,
    EFFECT_POV_TEXT,
    EFFECT_LOGO,
    EFFECT_SOLID
};

EffectType currentEffect = EFFECT_RAINBOW;

// Hall sensor variables
volatile unsigned long lastHallTrigger = 0;
volatile unsigned long revolutionTime = 40000; // Expected ~1500 RPM default representation (micros)
volatile bool newFrame = false;

// =====================================================
// HALL SENSOR ISR
// =====================================================

void IRAM_ATTR hallISR() {
    unsigned long now = micros();
    unsigned long diff = now - lastHallTrigger;
    if (diff > 4000) { // Software debounce (above 15,000 RPM is ignored to avoid electromagnetic noise)
        revolutionTime = diff;
        lastHallTrigger = now;
        newFrame = true;
    }
}

// =====================================================
// EFFECT SELECTION HELPER
// =====================================================

bool setEffectByName(String name) {
    name.trim();
    name.toLowerCase();
    
    if (name.startsWith("effect:")) {
        name = name.substring(7);
        name.trim();
    }
    
    if (name == "clock" || name == "0") {
        currentEffect = EFFECT_CLOCK;
        ledState = true;
        return true;
    }
    else if (name == "rainbow" || name == "1") {
        currentEffect = EFFECT_RAINBOW;
        ledState = true;
        return true;
    }
    else if (name == "fire" || name == "2") {
        currentEffect = EFFECT_FIRE;
        ledState = true;
        return true;
    }
    else if (name == "matrix" || name == "3") {
        currentEffect = EFFECT_MATRIX;
        ledState = true;
        return true;
    }
    else if (name == "hypno" || name == "4") {
        currentEffect = EFFECT_HYPNO;
        ledState = true;
        return true;
    }
    else if (name == "space" || name == "5") {
        currentEffect = EFFECT_SPACE;
        ledState = true;
        return true;
    }
    else if (name == "mandala" || name == "6") {
        currentEffect = EFFECT_MANDALA;
        ledState = true;
        return true;
    }
    else if (name == "acid" || name == "7") {
        currentEffect = EFFECT_ACID;
        ledState = true;
        return true;
    }
    else if (name == "plasma" || name == "8") {
        currentEffect = EFFECT_PLASMA;
        ledState = true;
        return true;
    }
    else if (name == "portal" || name == "9") {
        currentEffect = EFFECT_PORTAL;
        ledState = true;
        return true;
    }
    else if (name == "dna" || name == "10") {
        currentEffect = EFFECT_DNA;
        ledState = true;
        return true;
    }
    else if (name == "mushrooms" || name == "11") {
        currentEffect = EFFECT_MUSHROOMS;
        ledState = true;
        return true;
    }
    else if (name == "alien" || name == "12") {
        currentEffect = EFFECT_ALIEN;
        ledState = true;
        return true;
    }
    else if (name == "cube3d" || name == "13") {
        currentEffect = EFFECT_CUBE3D;
        ledState = true;
        return true;
    }
    else if (name == "kaleido" || name == "14") {
        currentEffect = EFFECT_KALEIDO;
        ledState = true;
        return true;
    }
    else if (name == "video_synth" || name == "synth" || name == "15") {
        currentEffect = EFFECT_VIDEO_SYNTH;
        ledState = true;
        return true;
    }
    else if (name == "anime_flow" || name == "anime" || name == "16") {
        currentEffect = EFFECT_ANIME_FLOW;
        ledState = true;
        return true;
    }
    else if (name == "pov_text" || name == "text" || name == "17") {
        currentEffect = EFFECT_POV_TEXT;
        ledState = true;
        return true;
    }
    else if (name == "logo" || name == "18") {
        currentEffect = EFFECT_LOGO;
        ledState = true;
        return true;
    }
    else if (name == "solid" || name == "19") {
        currentEffect = EFFECT_SOLID;
        return true;
    }
    return false;
}

// =====================================================
// MATHS & RENDERING ENGINE
// =====================================================

RgbColor getEffectColor(int pixel, float angle, unsigned long timeMs) {
    if (!ledState) return RgbColor(0, 0, 0);

    float r = (float)pixel / (float)PIXEL_COUNT;
    
    switch (currentEffect) {
        case EFFECT_CLOCK: {
            float secAngle = (float)((timeMs / 1000) % 60) * 6.0f;
            float minAngle = (float)(((timeMs / 60000) % 60)) * 6.0f;
            float hourAngle = (float)(((timeMs / 720000) % 12)) * 30.0f;
            
            if (abs(angle - secAngle) < 2.0f && r > 0.2f) return RgbColor(0, 180, 255);
            if (abs(angle - minAngle) < 3.0f && r > 0.1f && r < 0.8f) return RgbColor(0, 255, 0);
            if (abs(angle - hourAngle) < 5.0f && r < 0.6f) return RgbColor(255, 0, 0);
            
            if (r > 0.85f && r < 0.95f) {
                if (abs(angle - 0.0f) < 4.0f || abs(angle - 90.0f) < 4.0f || 
                    abs(angle - 180.0f) < 4.0f || abs(angle - 270.0f) < 4.0f) {
                    return RgbColor(255, 255, 255);
                }
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_RAINBOW: {
            float hue = angle / 360.0f + r * 0.5f + (float)(timeMs % 4000) / 4000.0f;
            if (hue > 1.0f) hue -= 1.0f;
            return HsvToRgb(hue, 1.0f, 1.0f);
        }
        
        case EFFECT_FIRE: {
            float angleRad = angle * DEG_TO_RAD;
            float noise = sin(angleRad * 3.0f + (float)timeMs * 0.01f) * 0.15f + 0.5f;
            float targetR = cos(angleRad) * 0.4f + 0.6f; 
            if (r < targetR * noise) {
                float intensity = r / (targetR * noise);
                if (intensity < 0.3f) return RgbColor(255, 255, 120);
                else if (intensity < 0.7f) return RgbColor(255, 90, 0);
                else return RgbColor(180, 0, 0);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_MATRIX: {
            int column = (int)(angle / 15.0f);
            float offset = (float)((timeMs / 15) % 100) / 100.0f;
            float bulletPos = offset + (float)(column % 5) * 0.2f;
            if (bulletPos > 1.0f) bulletPos -= 1.0f;
            
            float dist = abs(r - bulletPos);
            if (dist < 0.15f) {
                uint8_t greenStrength = (uint8_t)((1.0f - (dist / 0.15f)) * 255.0f);
                return RgbColor(0, greenStrength, 0);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_HYPNO: {
            float spin = (float)timeMs * 0.008f;
            float val = sin(r * 15.0f - angle * DEG_TO_RAD * 2.0f + spin);
            if (val > 0.4f) {
                return RgbColor(140, 0, 255);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_SPACE: {
            float star1 = sin((angle + (float)timeMs * 0.08f) * DEG_TO_RAD * 6.0f);
            float star2 = cos((r * 25.0f - (float)timeMs * 0.004f) * 8.0f);
            if (star1 > 0.95f && star2 > 0.85f) {
                return RgbColor(255, 255, 255);
            }
            return RgbColor(0, 0, 10);
        }
        
        case EFFECT_MANDALA: {
            float val = cos(angle * DEG_TO_RAD * 6.0f) * 0.25f + 0.55f;
            float val2 = sin(r * 6.28f * 4.0f);
            if (abs(r - val) < 0.08f || (val2 > 0.85f && abs(r - 0.75f) < 0.04f)) {
                return RgbColor(45, 212, 191);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_ACID: {
            float t = (float)timeMs * 0.004f;
            uint8_t red = (uint8_t)((sin(angle * DEG_TO_RAD + t) * 0.5f + 0.5f) * 255.0f);
            uint8_t green = (uint8_t)((sin(r * 6.28f + t * 1.5f) * 0.5f + 0.5f) * 255.0f);
            uint8_t blue = (uint8_t)((cos(angle * DEG_TO_RAD * 3.0f - t) * 0.5f + 0.5f) * 255.0f);
            return RgbColor(red, green, blue);
        }
        
        case EFFECT_PLASMA: {
            float t = (float)timeMs * 0.003f;
            float x = r * cos(angle * DEG_TO_RAD);
            float y = r * sin(angle * DEG_TO_RAD);
            float claim = sin(x * 5.0f + t) + sin(y * 5.0f + t) + sin(sqrt(x*x + y*y) * 10.0f - t);
            float pVal = claim / 3.0f * 0.5f + 0.5f;
            
            uint8_t red = (uint8_t)(pVal * 128.0f);
            uint8_t green = (uint8_t)((1.0f - pVal) * 255.0f);
            uint8_t blue = (uint8_t)(sin(pVal * 3.14f) * 255.0f);
            return RgbColor(red, green, blue);
        }
        
        case EFFECT_PORTAL: {
            float ringWidth = 0.08f;
            float radiusOfPortal = 0.6f + sin((angle * 6.0f * DEG_TO_RAD) + (float)timeMs * 0.012f) * 0.05f;
            if (abs(r - radiusOfPortal) < ringWidth) {
                if (angle < 180.0f) {
                    return RgbColor(0, 140, 255);
                } else {
                    return RgbColor(255, 90, 0);
                }
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_DNA: {
            float rot = (float)timeMs * 0.004f;
            float dnaAngle1 = sin(r * 6.0f - rot) * 40.0f + 180.0f;
            float dnaAngle2 = sin(r * 6.0f - rot + 3.1415f) * 40.0f + 180.0f;
            
            if (abs(angle - dnaAngle1) < 4.0f) {
                return RgbColor(244, 63, 94);
            }
            if (abs(angle - dnaAngle2) < 4.0f) {
                return RgbColor(56, 189, 248);
            }
            if (abs(dnaAngle1 - dnaAngle2) > 8.0f && abs(angle - (dnaAngle1 + dnaAngle2)/2.0f) < 2.0f) {
                float modR = fmod(r * 12.0f, 1.0f);
                if (modR < 0.2f) return RgbColor(255, 255, 255);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_MUSHROOMS: {
            float angCheck = fmod(angle, 120.0f);
            if (angCheck < 15.0f || angCheck > 105.0f) {
                float localAng = angCheck < 15.0f ? angCheck : angCheck - 120.0f;
                if (r > 0.4f && r < 0.8f && abs(localAng) < 12.0f) {
                    float dome = 0.8f - (abs(localAng) / 12.0f) * 0.2f;
                    if (r < dome) return RgbColor(251, 113, 133);
                }
                if (r > 0.1f && r <= 0.4f && abs(localAng) < 3.0f) {
                    return RgbColor(255, 255, 230);
                }
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_ALIEN: {
            float normAng = angle > 180.0f ? angle - 360.0f : angle;
            if (abs(normAng) < 35.0f) {
                float faceRadius = 0.75f - (abs(normAng) / 35.0f) * 0.2f;
                if (r < faceRadius && r > 0.15f) {
                    float eyeX1 = 0.4f * cos(18.0f * DEG_TO_RAD);
                    float eyeY1 = 0.4f * sin(18.0f * DEG_TO_RAD);
                    float eyeX2 = 0.4f * cos(-18.0f * DEG_TO_RAD);
                    float eyeY2 = 0.4f * sin(-18.0f * DEG_TO_RAD);
                    
                    float px = r * cos(normAng * DEG_TO_RAD);
                    float py = r * sin(normAng * DEG_TO_RAD);
                    
                    float d1 = sqrt((px-eyeX1)*(px-eyeX1) + (py-eyeY1)*(py-eyeY1));
                    float d2 = sqrt((px-eyeX2)*(px-eyeX2) + (py-eyeY2)*(py-eyeY2));
                    
                    if (d1 < 0.12f || d2 < 0.12f) {
                        return RgbColor(0, 0, 0);
                    }
                    if (abs(px - 0.25f) < 0.04f && abs(py) < 0.07f) {
                        return RgbColor(0, 0, 0);
                    }
                    return RgbColor(134, 239, 172);
                }
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_CUBE3D: {
            float rotX = (float)timeMs * 0.0012f;
            float rotY = (float)timeMs * 0.0018f;
            
            float pts[8][3] = {
                {-0.32f, -0.32f, -0.32f}, {0.32f, -0.32f, -0.32f}, {0.32f, 0.32f, -0.32f}, {-0.32f, 0.32f, -0.32f},
                {-0.32f, -0.32f, 0.32f},  {0.32f, -0.32f, 0.32f},  {0.32f, 0.32f, 0.32f},  {-0.32f, 0.32f, 0.32f}
            };
            
            float proj[8][2];
            for (int i=0; i<8; i++) {
                float y1 = pts[i][1]*cos(rotX) - pts[i][2]*sin(rotX);
                float z1 = pts[i][1]*sin(rotX) + pts[i][2]*cos(rotX);
                float x2 = pts[i][0]*cos(rotY) + z1*sin(rotY);
                float z2 = -pts[i][0]*sin(rotY) + z1*cos(rotY);
                
                float scale = 1.0f / (1.0f - z2 * 0.45f);
                proj[i][0] = x2 * scale;
                proj[i][1] = y1 * scale;
            }
            
            float px = r * cos(angle * DEG_TO_RAD);
            float py = r * sin(angle * DEG_TO_RAD);
            
            int edges[12][2] = {
                {0,1}, {1,2}, {2,3}, {3,0},
                {4,5}, {5,6}, {6,7}, {7,4},
                {0,4}, {1,5}, {2,6}, {3,7}
            };
            
            for (int e=0; e<12; e++) {
                float x1 = proj[edges[e][0]][0];
                float y1 = proj[edges[e][0]][1];
                float x2 = proj[edges[e][1]][0];
                float y2 = proj[edges[e][1]][1];
                
                float l2 = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
                if (l2 == 0.0f) continue;
                float t = ((px-x1)*(x2-x1) + (py-y1)*(y2-y1)) / l2;
                t = max(0.0f, min(1.0f, t));
                float hx = x1 + t*(x2-x1);
                float hy = y1 + t*(y2-y1);
                float d = sqrt((px-hx)*(px-hx) + (py-hy)*(py-hy));
                if (d < 0.022f) {
                    return RgbColor(96, 165, 250);
                }
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_KALEIDO: {
            float localAngle = fmod(angle, 45.0f);
            if (localAngle > 22.5f) localAngle = 45.0f - localAngle;
            float factor = localAngle / 22.5f;
            uint8_t red = (uint8_t)((sin(factor * 3.14f + (float)timeMs * 0.006f) * 0.5f + 0.5f) * 255.0f);
            uint8_t green = (uint8_t)((cos(r * 6.28f - (float)timeMs * 0.004f) * 0.5f + 0.5f) * 255.0f);
            uint8_t blue = (uint8_t)(factor * 255.0f);
            return RgbColor(red, green, blue);
        }
        
        case EFFECT_VIDEO_SYNTH: {
            float speed = (float)timeMs * 0.012f;
            float pattern = sin(r * 18.0f - speed) * cos(angle * DEG_TO_RAD * 4.0f + speed * 0.6f);
            if (pattern > 0.4f) {
                return RgbColor(56, 189, 248);
            } else if (pattern < -0.4f) {
                return RgbColor(244, 63, 94);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_ANIME_FLOW: {
            float animeTime = (float)timeMs * 0.024f;
            float streak = sin(angle * 7.0f * DEG_TO_RAD - animeTime);
            if (streak > 0.75f && r > 0.35f) {
                return RgbColor(168, 85, 247);
            }
            float ring = fmod(r - animeTime * 0.06f, 0.45f);
            if (abs(ring) < 0.04f) {
                return RgbColor(255, 255, 255);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_POV_TEXT: {
            float textCenter = 90.0f;
            float diffAngle = angle - textCenter;
            if (diffAngle > 180.0f) diffAngle -= 360.0f;
            if (diffAngle < -180.0f) diffAngle += 360.0f;
            
            if (abs(diffAngle) < 32.0f && r > 0.45f && r < 0.85f) {
                float normX = (diffAngle + 32.0f) / 64.0f;
                float normY = (r - 0.45f) / 0.4f;
                
                int charIdx = (int)(normX * 8.0f);
                float charX = fmod(normX * 8.0f, 1.0f);
                
                const uint8_t font[9][5] = {
                    {0x7F, 0x08, 0x08, 0x08, 0x7F}, // H
                    {0x3E, 0x41, 0x41, 0x41, 0x3E}, // O
                    {0x7F, 0x40, 0x40, 0x40, 0x40}, // L
                    {0x3E, 0x41, 0x41, 0x41, 0x3E}, // O
                    {0x46, 0x49, 0x49, 0x49, 0x31}, // S
                    {0x7F, 0x09, 0x09, 0x09, 0x06}, // P
                    {0x41, 0x41, 0x7F, 0x41, 0x41}, // I
                    {0x7F, 0x04, 0x08, 0x10, 0x7F}, // N
                    {0x00, 0x00, 0x00, 0x00, 0x00}
                };
                
                int col = (int)(charX * 5.0f);
                int row = (int)(normY * 7.0f);
                
                if (charIdx >= 0 && charIdx < 8 && col >= 0 && col < 5 && row >= 0 && row < 7) {
                    uint8_t data = font[charIdx][col];
                    if ((data & (1 << row)) != 0) {
                        return RgbColor(252, 211, 77);
                    }
                }
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_LOGO: {
            float rInner = 0.25f;
            float rOuter = 0.9f;
            if (r > rInner && r < rOuter) {
                float angleOffset = r * 6.0f - (float)timeMs * 0.004f;
                float spiralAngle = fmod(angle * DEG_TO_RAD + angleOffset, 2.094f);
                if (spiralAngle < 0.45f) {
                    return RgbColor(0, 180, 255);
                } else if (spiralAngle > 1.0f && spiralAngle < 1.45f) {
                     return RgbColor(244, 63, 94);
                }
            }
            if (r < 0.15f && sin((float)timeMs * 0.012f) > 0.4f) {
                return RgbColor(255, 255, 255);
            }
            return RgbColor(0, 0, 0);
        }
        
        case EFFECT_SOLID:
        default: {
            return RgbColor(ledR, ledG, ledB);
        }
    }
}

void renderPOV(float angle, unsigned long timeMs) {
    // Center point projection (Blade 1)
    for (int i = 0; i < PIXEL_COUNT; i++) {
        strip1.SetPixelColor(i, getEffectColor(i, angle, timeMs));
    }
    
    // Blade 2 (Opposite blade at 180 degrees shift)
    float angle2 = angle + 180.0f;
    if (angle2 >= 360.0f) angle2 -= 360.0f;
    for (int i = 0; i < PIXEL_COUNT; i++) {
        strip2.SetPixelColor(i, getEffectColor(i, angle2, timeMs));
    }
}

// =====================================================
// HC-05 BLUETOOTH CLASSIC SERIAL SETUP
// =====================================================

void setupHC05() {
    // Bluetooth HC-05 Classic setup using standard HardwareSerial
    Serial2.begin(HC05_BAUD, SERIAL_8N1, HC05_RX_PIN, HC05_TX_PIN);
    Serial.println("HC-05 Bluetooth Serial Initialized at 9600 bps on RX2/TX2 (Pins 16/17)");
    bluetoothConnected = true;
}

void processIncomingCommand(String cmd) {
    cmd.trim();
    if (cmd.length() == 0) return;
    
    Serial.print("HC-05 CMD: ");
    Serial.println(cmd);
    
    String upperValue = cmd;
    upperValue.toUpperCase();

    if (upperValue == "ON") {
        ledState = true;
        Serial2.println("OK: LEDs ON");
    }
    else if (upperValue == "OFF") {
        ledState = false;
        Serial2.println("OK: LEDs OFF");
    }
    else if (upperValue == "STATUS") {
        String status = ledState ? "ON" : "OFF";
        status += " RGB:" + String(ledR) + "," + String(ledG) + "," + String(ledB);
        status += " EFFECT:" + String(currentEffect);
        Serial2.println(status);
    }
    else if (upperValue.startsWith("EFFECT:") || setEffectByName(cmd)) {
        if (upperValue.startsWith("EFFECT:")) {
            setEffectByName(cmd.substring(7));
        }
        Serial2.println("OK: Effect set");
    }
    else {
        int r = -1, g = -1, b = -1;
        int first  = cmd.indexOf(',');
        int second = cmd.lastIndexOf(',');

        if (first != -1 && second != -1 && first != second) {
            r = cmd.substring(0, first).toInt();
            g = cmd.substring(first + 1, second).toInt();
            b = cmd.substring(second + 1).toInt();
        }

        if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
            ledR = r; ledG = g; ledB = b;
            currentEffect = EFFECT_SOLID;
            ledState = true;

            String msg = "OK: RGB(" + String(r) + "," + String(g) + "," + String(b) + ")";
            Serial2.println(msg);
            Serial.println(msg);
        }
        else {
            Serial2.println("ERR: Unknown command");
            Serial.println("HC-05: unknown command");
        }
    }
}

// =====================================================
// WEB & COMMS TASK (Core 0)
// =====================================================

void webloop(void *pvParameters) {
    for (;;) {
        server.handleClient();
        ElegantOTA.loop();
        
        // Listen to HC-05 classic Bluetooth serial commands
        if (Serial2.available() > 0) {
            String incoming = Serial2.readStringUntil('\n');
            processIncomingCommand(incoming);
        }
        
        vTaskDelay(1);
    }
}

// =====================================================
// SETUP
// =====================================================

void setup() {
    Serial.begin(115200);
    delay(2000);

    Serial.println();
    Serial.println("BOOT OK");

    pinMode(HALL_PIN, INPUT_PULLUP); // Hall Sensor Active Low (using external/internal pullup)
    pinMode(MOTOR_PIN, OUTPUT);
    
    // Attach hardware interrupt for high precision POV rotation synchronization
    attachInterrupt(digitalPinToInterrupt(HALL_PIN), hallISR, FALLING);

    // =================================================
    // LEDS
    // =================================================

    strip1.Begin();
    strip1.Show();

    strip2.Begin();
    strip2.Show();

    Serial.println("LED INIT OK");

    // =================================================
    // HC-05 CLASSIC BLUETOOTH
    // =================================================

    setupHC05();

    // =================================================
    // WIFI (AP + STA)
    // =================================================

    WiFi.mode(WIFI_AP_STA);
    WiFi.setSleep(false); // Optimization for BLE and Webserver response
    
    Serial.println("Starting WiFi Services...");

    bool ap = WiFi.softAP(AP_SSID, AP_PASS, 1, false, 4);

    if (ap) {
        Serial.println("AP STARTED");
        Serial.print("AP IP: ");
        Serial.println(WiFi.softAPIP());
    } else {
        Serial.println("AP FAILED");
    }

    delay(500);

    WiFi.begin(ROUTER_SSID, ROUTER_PASS);

    Serial.print("Connecting to router");
    unsigned long startAttempt = millis();

    while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 10000) {
        delay(500);
        Serial.print(".");
    }

    Serial.println();

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("ROUTER CONNECTED");
        Serial.print("ROUTER IP: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("ROUTER FAILED - AP still available");
    }

    // =================================================
    // WEB SERVER ENDPOINTS
    // =================================================

    server.on("/", HTTP_GET, []() {
        String html = "<html><head><title>HoloSpin POV</title>";
        html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
        html += "<style>body{background:#0d0e15;color:#e2e8f0;font-family:sans-serif;text-align:center;padding:20px;}";
        html += "h1{color:#00e5ff;font-size:2rem;} .btn{background:#1e293b;color:white;border:1px solid #334155;padding:12px 20px;";
        html += "margin:5px;border-radius:10px;font-weight:bold;cursor:pointer;transition:0.2s;} .btn:hover{background:#00e5ff;color:#0d0e15;}";
        html += ".active{background:#00e5ff;color:#0d0e15;} .container{max-width:500px;margin:auto;background:#151724;padding:20px;border-radius:20px;border:1px solid #202438;}</style>";
        html += "</head><body><div class='container'><h1>HoloSpin POV ESP32</h1><p>Status: Active</p>";
        html += "<p>Change POV Effect:</p>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=clock')\">Clock</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=rainbow')\">Rainbow</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=fire')\">Fire</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=matrix')\">Matrix</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=hypno')\">Hypno</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=space')\">Space</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=mandala')\">Mandala</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=acid')\">Acid</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=plasma')\">Plasma</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=portal')\">Portal</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=dna')\">DNA</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=mushrooms')\">Mushrooms</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=alien')\">Alien</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=cube3d')\">3D Cube</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=kaleido')\">Kaleido</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=synth')\">CRT Synth</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=anime')\">Anime Flow</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=text')\">POV Text</button>";
        html += "<button class='btn' onclick=\"fetch('/effect?val=logo')\">Holo Logo</button>";
        html += "<br><br><button class='btn' style='background:#ef4444;border-color:#f87171;' onclick=\"fetch('/toggle')\">Toggle ON/OFF</button>";
        html += "</div></body></html>";
        server.send(200, "text/html", html);
    });

    server.on("/toggle", HTTP_GET, []() {
        ledState = !ledState;
        server.send(200, "text/plain", ledState ? "ON" : "OFF");
    });

    server.on("/effect", HTTP_GET, []() {
        if (server.hasArg("val")) {
            String effectName = server.arg("val");
            bool success = setEffectByName(effectName);
            if (success) {
                server.send(200, "text/plain", "OK: " + effectName);
            } else {
                server.send(400, "text/plain", "ERR: Unknown effect");
            }
        } else {
            server.send(400, "text/plain", "ERR: Missing val parameter");
        }
    });

    server.on("/status", HTTP_GET, []() {
        StaticJsonDocument<200> doc;
        doc["status"] = "online";
        doc["led_state"] = ledState ? "ON" : "OFF";
        doc["current_effect_id"] = (int)currentEffect;
        doc["ip"] = WiFi.localIP().toString();
        doc["rssi"] = WiFi.RSSI();
        doc["bluetooth_classic_connected"] = bluetoothConnected;
        doc["rpm"] = revolutionTime > 0 ? (60000000.0f / revolutionTime) : 0;
        
        String json;
        serializeJson(doc, json);
        server.send(200, "application/json", json);
    });

    ElegantOTA.begin(&server);
    server.begin();
    Serial.println("HTTP Web Server Activated successfully");

    // Start web loop task on Core 0 to leave Core 1 free for display processing
    xTaskCreatePinnedToCore(
        webloop,     // Task function
        "webloop",   // Task name
        4096,        // Stack size
        NULL,        // Parameters
        1,           // Priority
        NULL,        // Task handle
        0            // Core 0
    );

    Serial.println("SETUP COMPLETED SUCCESSFULY - READY FOR POV");
}

// =====================================================
// LOOP (Core 1)
// =====================================================

void loop() {
    unsigned long now = micros();
    unsigned long elapsed = now - lastHallTrigger;
    
    // Simulate rotation of blade in case motor is inactive or Hall is sensor not triggered
    if (elapsed > 1000000) { 
        revolutionTime = 40000; // Simulated ~1500 RPM for default visual render
        elapsed = elapsed % revolutionTime;
    }
    
    // Calculate precise blade angle from 0.0 to 359.9 degrees
    float angle = (float)elapsed / (float)revolutionTime * 360.0f;
    if (angle >= 360.0f) angle = 359.9f;
    
    unsigned long timeMs = millis();
    
    // Render and print effect color positions
    renderPOV(angle, timeMs);
    
    // Low latency ws2812x projection logic
    strip1.Show();
    strip2.Show();
    
    // Avoid watchdog execution constraints on App Core 1
    delayMicroseconds(50);
}
