# Holospin ESP32 Firmware

## Hardware Configuration
- **MCU**: ESP32 DevKit
- **LEDs**: 88 × WS2812B total (2 arms × 44 LEDs)
- **Sensor**: Hall Effect Sensor
- **Pins**:
  - Arm A LEDs → **Pin 25**
  - Arm B LEDs → **Pin 26**
  - Hall Sensor → **Pin 4**
  - Motor Control → **Pin 17**

## Wi-Fi & Bluetooth Setup
Before flashing, edit the credentials in `src/main.cpp`:

```cpp
#define ROUTER_SSID "YOUR_ROUTER_SSID"   // Leave as-is for AP-only mode
#define ROUTER_PASS "YOUR_ROUTER_PASS"
#define AP_SSID     "Holospin_AP"        // AP network name
#define AP_PASS     "12345678"           // AP password (min 8 chars)
```

- **AP-only mode**: Leave `ROUTER_SSID` as `"YOUR_ROUTER_SSID"` — the ESP32 will broadcast its own Wi-Fi at `192.168.4.1`.
- **Router mode**: Enter your home router SSID/password — the ESP32 will join your network while also keeping the AP alive.
- **Bluetooth**: The device advertises as `"Holospin_BLE"` with service UUID `4fafc201-1fb5-459e-8fcc-c5c9c331914b`. Use Chrome (desktop) to pair via the dashboard.

## Flash Instructions
1. Install [PlatformIO](https://platformio.org/) (VS Code extension or CLI).
2. Open this `/firmware` directory.
3. Connect ESP32 via USB.
4. Run: `pio run --target upload`
5. Monitor serial output: `pio device monitor`

## OTA Updates
After initial flash, OTA updates are available at `http://<ESP32-IP>/update` (powered by ElegantOTA).
