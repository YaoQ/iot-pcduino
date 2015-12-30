var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://192.168.1.106');
 
client.on('connect', function () {
  client.publish('device/control', 'Hello!', {retain: false, qa: 1});
client.end();
});
