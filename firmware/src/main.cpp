#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <WebServer.h>
#include <ElegantOTA.h>
#include <NeoPixelBus.h>
#include <ArduinoJson.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include "Config.h"

// =====================================================
// BLE UUIDs
// =====================================================

#define BLE_DEVICE_NAME "Holospin"
#define BLE_SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define BLE_CHAR_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

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
// GLOBALS
// =====================================================

bool ledState = false;
uint8_t ledR = 255;
uint8_t ledG = 0;
uint8_t ledB = 0;
bool bleConnected = false;

BLEServer* pServer = nullptr;
BLECharacteristic* pCharLED = nullptr;

// =====================================================
// LED HELPER
// =====================================================

void setAllLEDs(uint8_t r, uint8_t g, uint8_t b)
{
    for (int i = 0; i < PIXEL_COUNT; i++)
    {
        strip1.SetPixelColor(i, RgbColor(r, g, b));
        strip2.SetPixelColor(i, RgbColor(r, g, b));
    }
    strip1.Show();
    strip2.Show();
}

void clearAllLEDs()
{
    strip1.ClearTo(RgbColor(0));
    strip2.ClearTo(RgbColor(0));
    strip1.Show();
    strip2.Show();
}

// =====================================================
// BLE CALLBACKS
// =====================================================

class HolospinBLEServerCallbacks : public BLEServerCallbacks
{
    void onConnect(BLEServer* pSvr) override
    {
        bleConnected = true;
        Serial.println("BLE CONNECTED");
    }

    void onDisconnect(BLEServer* pSvr) override
    {
        bleConnected = false;
        Serial.println("BLE DISCONNECTED - restarting advertising");
        pSvr->startAdvertising();
    }
};

class LEDCharCallbacks : public BLECharacteristicCallbacks
{
    void onWrite(BLECharacteristic* pChar) override
    {
        String value = pChar->getValue().c_str();
        value.trim();
        value.toUpperCase();

        Serial.print("BLE CMD: ");
        Serial.println(value);

        if (value == "ON")
        {
            ledState = true;
            setAllLEDs(ledR, ledG, ledB);
            pChar->setValue("OK: LEDs ON");
        }
        else if (value == "OFF")
        {
            ledState = false;
            clearAllLEDs();
            pChar->setValue("OK: LEDs OFF");
        }
        else if (value == "STATUS")
        {
            String status = ledState ? "ON" : "OFF";
            status += " R:" + String(ledR) +
                      " G:" + String(ledG) +
                      " B:" + String(ledB);
            pChar->setValue(status.c_str());
        }
        else
        {
            int r = -1, g = -1, b = -1;
            int first  = value.indexOf(',');
            int second = value.lastIndexOf(',');

            if (first != -1 && second != -1 && first != second)
            {
                r = value.substring(0, first).toInt();
                g = value.substring(first + 1, second).toInt();
                b = value.substring(second + 1).toInt();
            }

            if (r >= 0 && r <= 255 &&
                g >= 0 && g <= 255 &&
                b >= 0 && b <= 255)
            {
                ledR = r; ledG = g; ledB = b;
                ledState = true;
                setAllLEDs(ledR, ledG, ledB);

                String msg = "OK: RGB(" + String(r) + "," +
                             String(g) + "," + String(b) + ")";
                pChar->setValue(msg.c_str());
                Serial.println(msg);
            }
            else
            {
                pChar->setValue("ERR: unknown command");
                Serial.println("BLE: unknown command");
            }
        }

        pChar->notify();
    }
};

// =====================================================
// BLE INIT
// =====================================================

void setupBLE()
{
    BLEDevice::init(BLE_DEVICE_NAME);

    pServer = BLEDevice::createServer();
    pServer->setCallbacks(new HolospinBLEServerCallbacks());

    BLEService* pService = pServer->createService(BLE_SERVICE_UUID);

    pCharLED = pService->createCharacteristic(
        BLE_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ  |
        BLECharacteristic::PROPERTY_WRITE |
        BLECharacteristic::PROPERTY_NOTIFY
    );

    pCharLED->addDescriptor(new BLE2902());
    pCharLED->setCallbacks(new LEDCharCallbacks());
    pCharLED->setValue("READY");

    pService->start();

    BLEAdvertising* pAdv = BLEDevice::getAdvertising();
    pAdv->addServiceUUID(BLE_SERVICE_UUID);
    pAdv->setScanResponse(true);
    pAdv->setMinPreferred(0x06);
    BLEDevice::startAdvertising();

    Serial.println("BLE STARTED - Device: " BLE_DEVICE_NAME);
}

// =====================================================
// WEB TASK
// =====================================================

void webloop(void *pvParameters)
{
    for (;;)
    {
        server.handleClient();
        ElegantOTA.loop();
        vTaskDelay(1);
    }
}

// =====================================================
// SETUP
// =====================================================

void setup()
{
    Serial.begin(115200);
    delay(2000);

    Serial.println();
    Serial.println("BOOT OK");

    pinMode(HALL_PIN, INPUT);
    pinMode(MOTOR_PIN, OUTPUT);

    // =================================================
    // LEDS
    // =================================================

    strip1.Begin();
    strip1.Show();

    strip2.Begin();
    strip2.Show();

    Serial.println("LED INIT OK");

    // =================================================
    // BLE
    // =================================================

    setupBLE();

    // =================================================
    // WIFI
    // =================================================

    WiFi.mode(WIFI_AP_STA);
    Serial.println("Starting WiFi...");

    bool ap = WiFi.softAP(AP_SSID, AP_PASS, 1, false, 4);

    if (ap)
    {
        Serial.println("AP STARTED");
        Serial.print("AP IP: ");
        Serial.println(WiFi.softAPIP());
    }
    else
    {
        Serial.println("AP FAILED");
    }

    delay(500);

    WiFi.begin(ROUTER_SSID, ROUTER_PASS);

    Serial.print("Connecting to router");
    unsigned long startAttempt = millis();

    while (WiFi.status() != WL_CONNECTED &&
           millis() - startAttempt < 10000)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("ROUTER CONNECTED");
        Serial.print("ROUTER IP: ");
        Serial.println(WiFi.localIP());
    }
    else
    {
        Serial.println("ROUTER FAILED - AP still available");
    }

    // =================================================
    // WEB SERVER
    // =================================================

    server.on("/", HTTP_GET, []() {
        server.send(200, "text/plain", "Holospin 3D POV Display Status: Online");
    });

    ElegantOTA.begin(&server);
    server.begin();
    Serial.println("HTTP Server Started");

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
}

// =====================================================
// LOOP
// =====================================================

void loop()
{
    // POV render engine loops directly here on Core 1
}
