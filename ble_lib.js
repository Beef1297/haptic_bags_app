const serviceUuid = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';


const serviceName = 'nRFHapBag';
const txCharacteristicUuid = '04b65383-ed3f-4fd7-b273-29b34de15b37';
const rxCharacteristicUuid = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
// const _tempUuid = "690c0959-8a84-fefd-b216-2308b8025dcd"
// #define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// #define CHARACTERISTIC_RX_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
// #define CHARACTERISTIC_TX_UUID "04b65383-ed3f-4fd7-b273-29b34de15b37"

const ble = new BlueJelly();
console.log(ble);

ble.onStartNotify = function (uuid){
  console.log("> start notify: " + uuid);
}
ble.onStopNotify = function (uuid) {
  console.log("> stop notify: " + uuid);
}

// https://stackoverflow.com/questions/5320439/how-do-i-swap-endian-ness-byte-order-of-a-variable-in-javascript
function swap32(val) {
  return ((val & 0xFF) << 24)
         | ((val & 0xFF00) << 8)
         | ((val >> 8) & 0xFF00)
         | ((val >> 24) & 0xFF);
}

ble.onRead = function(data, uuid) {
  // console.log(data, uuid);
  // val = data.getInt16(0);
  let buffer = data.buffer;
  // console.log(buffer);
  val = new Float32Array(buffer);
  // console.log(val);
  if(val.length > 3) {
    accX = val[0];
    accY = val[1];
    accZ = val[2];
    distance = val[3];
    setAccels(accX, accY, accZ);
    setDistance(distance);
  }


  // getValue(val);
  // val = data.getFloat32(0);
  // sw_val = swap32(val);
  // console.log(sw_val);
  // val = data.getFloat32(0);
  // console.log(val, data);
}

let myCharacteristic;
let myBLE;
let receiveText;

function bleSetup() {
  ble.setUUID("UUID1", serviceUuid, txCharacteristicUuid);
  ble.setUUID("UUID2", serviceUuid, rxCharacteristicUuid);

  const bSizeX = 110; const bSizeY = 50;
  const scanButton = createButton("Scan");
  scanButton.mousePressed(scan);
  scanButton.size(bSizeX, bSizeY);

  const connectButton = createButton("Connect");
  connectButton.mousePressed(connectAndStartNotify);
  connectButton.size(bSizeX, bSizeY);

  const stopButton = createButton("Stop Notifications");
  stopButton.mousePressed(stopNotifications);
  stopButton.size(bSizeX, bSizeY);
}

function scan() {
  ble.scan("UUID1");
}

function connectAndStartNotify() {
  ble.connectGATT("UUID1");
  // myBLE.connect(serviceUuid, gotCharacteristics);
//   myBLE.connect(_tempUuid, gotCharacteristics);
  ble.startNotify("UUID1");
}

function write_ble(data) {
  ble.write("UUID2", data);
}

// function gotCharacteristics(error, characteristics) {
//   if (error) console.log("error: ", error);
//   for(let i=0; i<characteristics.length; i++) {
//     console.log(characteristics[i]);
//     if(txCharacteristic == characteristics[i].uuid) {
//       myCharacteristic = characteristics[i];
//       myBLE.startNotifications(myCharacteristic, handleNotifications, "string");
//     }
//   }
// }

// function handleNotifications(data) {
//   receiveText += data;
//   if (data === "\n") {
//     getValue(receiveText);
//     receiveText = "";
//   }
// }

function stopNotifications() {
  // myBLE.stopNotifications(myCharacteristic);
  ble.stopNotify("UUID1");
}