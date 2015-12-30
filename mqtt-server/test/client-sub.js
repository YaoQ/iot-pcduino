var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
 
client.on('connect', function () {
  client.subscribe('device/control');
 
client.on('message', function (topic, message) {
  console.log(message.toString());
client.end();
  });
});
