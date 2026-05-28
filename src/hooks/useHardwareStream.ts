import { useState, useEffect, useCallback, useRef } from 'react';
import { BleClient, ScanMode } from '@capacitor-community/bluetooth-le';

const ESP32_SERVICE = '0000aaaa-0000-1000-8000-00805f9b34fb'; 
const ESP32_CHARACTERISTIC_TX = '0000bbbb-0000-1000-8000-00805f9b34fb'; 
const ESP32_CHARACTERISTIC_RX = '0000cccc-0000-1000-8000-00805f9b34fb'; 

export function useHardwareStream(initialDeviceId: string | null) {
  const [data, setData] = useState<{ rpm?: number; temp?: number; [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(initialDeviceId);
  
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendCommand = useCallback(async (payload: any) => {
    if (!deviceId || !isConnected) return false;
    try {
      const dataView = new TextEncoder().encode(JSON.stringify(payload));
      await BleClient.write(deviceId, ESP32_SERVICE, ESP32_CHARACTERISTIC_RX, dataView);
      return true;
    } catch (err) {
      console.error("BLE Write Error:", err);
      return false;
    }
  }, [deviceId, isConnected]);

  const scanAndConnect = useCallback(async () => {
    try {
      setIsScanning(true);
      setError(null);
      await BleClient.initialize();
      
      // Auto-scan for ESP32 devices
      let foundId: string | null = null;
      await BleClient.requestLEScan(
        { services: [ESP32_SERVICE], name: "ESP32", scanMode: ScanMode.SCAN_MODE_LOW_LATENCY },
        (result) => {
          if (result.device.name === "ESP32" || result.localName === "ESP32") {
            foundId = result.device.deviceId;
            BleClient.stopLEScan();
          }
        }
      );

      // Wait for scan or timeout
      let retries = 0;
      while (!foundId && retries < 50) { // ~5 seconds
        await new Promise(r => setTimeout(r, 100));
        retries++;
      }

      if (foundId) {
        setDeviceId(foundId);
      } else {
        throw new Error("ESP32 hardware not found via scan.");
      }
    } catch (err: any) {
      setError(err.message || "Discovery failed");
    } finally {
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    if (!deviceId) return;

    let isSubscribed = false;
    
    const connect = async () => {
      try {
        // Drop existing connection if any
        try { await BleClient.disconnect(deviceId); } catch(e) {}

        // Timeout handler for connection hangs
        connectionTimeoutRef.current = setTimeout(() => {
          if (!isConnected) {
            setError("Connection attempt timed out");
          }
        }, 8000);

        await BleClient.connect(deviceId, (disconnectedId) => {
          setIsConnected(false);
          setError("Hardware connection dropped unexpectedly.");
        });

        if (connectionTimeoutRef.current) clearTimeout(connectionTimeoutRef.current);

        setIsConnected(true);
        setError(null);

        await BleClient.startNotifications(
          deviceId,
          ESP32_SERVICE,
          ESP32_CHARACTERISTIC_TX,
          (value) => {
            try {
              const jsonStr = new TextDecoder().decode(value.buffer);
              const parsed = JSON.parse(jsonStr);
              // Ensure we normalize RPM and Temp for the dashboard
              setData(prev => ({
                ...prev,
                ...parsed,
                rpm: typeof parsed.rpm === 'number' ? parsed.rpm : prev?.rpm || 0,
                temp: typeof parsed.temp === 'number' ? parsed.temp : prev?.temp || 0
              }));
            } catch (e) {
              console.warn("Telemetry parse error");
            }
          }
        );
        isSubscribed = true;
      } catch (err: any) {
        setError("Connection failed: " + (err.message || err));
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      if (connectionTimeoutRef.current) clearTimeout(connectionTimeoutRef.current);
      if (isSubscribed) {
        BleClient.stopNotifications(deviceId, ESP32_SERVICE, ESP32_CHARACTERISTIC_TX).catch(() => {});
      }
      BleClient.disconnect(deviceId).catch(() => {});
      setIsConnected(false);
    };
  }, [deviceId]);

  return { streamData: data, isConnected, isScanning, error, sendCommand, scanAndConnect, setDeviceId };
}

