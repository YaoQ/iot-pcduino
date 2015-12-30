var Hapi = require('hapi');
var mqtt = require('mqtt');

var server = new Hapi.Server();
var port = Number(process.env.PORT || 4444);

server.connection({ port: port, routes: { cors: true } });

var client  = mqtt.connect('mqtt://192.168.1.106:1883');
      
server.route([
  {
    method: 'POST',
    path: '/device/control',
    handler: function (request, reply) {
      var deviceInfo = 'dev' + request.payload.deviceNum + '-' + request.payload.command;
      reply(deviceInfo);
      
      console.log('Publish information!');
      client.publish('device/control',deviceInfo, {retain: false, qa:1});
    }
  }
]);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
