#pragma once

// VISUAL CONFIGURATION
#define PIXEL_COUNT 44

// LED STRIP PINS
#define PIN_STRIP1 25
#define PIN_STRIP2 26
#define PIN_STRIP3 33
#define PIN_STRIP4 32

// SENSOR AND MOTOR PINS
#define HALL_PIN 27
#define MOTOR_PIN 12

// WIFI - ROUTER / ראוטר (STA MODE)
#define ROUTER_SSID "Dael CR"
#define ROUTER_PASS "14cusco05"

// WIFI - LOCAL HOTSPOT / נקודה חמה (AP MODE)
// Changed to prevent network conflicts with your home router SSID
#define AP_SSID "Holospin_POV2"
#define AP_PASS "12345678"

// REGISTERED PLAYBACK FILES ON SD (אישור קבצי תצוגה לקוד)
#define PLAYBACK_FILE_COUNT 4
const char* PLAYBACK_FILES[PLAYBACK_FILE_COUNT] = {
  "/images/butterfly_nebula.png",
  "/images/hologram_planet.png",
  "/videos/galaxy_big_bang.mp4",
  "/videos/matrix_rain_tunnel.mp4"
};
