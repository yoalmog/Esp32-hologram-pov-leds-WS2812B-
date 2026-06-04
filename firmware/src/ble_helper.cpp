void initBLE() {
  Serial.println("[BLE] Initializing BLE...");
  
  // Create BLE Device with name
  NimBLEDevice::init("ESP32");
  
  // Create BLE Server
  NimBLEServer *pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  // Create BLE Service
  NimBLEService *pService = pServer->createService(SERVICE_UUID);

  // Create TX Characteristic (Device → App, Notifications)
  pTxCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_TX,
      NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY
  );
  pTxCharacteristic->createDescriptor("2902"); // CCCD for notifications

  // Create RX Characteristic (App → Device, Write)
  pRxCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_RX,
      NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::WRITE_NR
  );
  pRxCharacteristic->setCallbacks(new RxCallbacks());

  // Start the service
  pService->start();

  // Start advertising with proper settings
  NimBLEAdvertising *pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setName("ESP32");  // Set the advertising name
  pAdvertising->setAppearance(0);
  pAdvertising->start();

  Serial.println("[BLE] BLE Service started - Advertising as 'ESP32'");
  Serial.println("[BLE] Service UUID: 0000aaaa-0000-1000-8000-00805f9b34fb");
}
