console.log(process.pid);
//require('daemon')();
var mosca = require('mosca')
 
var moscaSettings = {
  port: 1883,
  host: "192.168.1.106"
};
 
var server = new mosca.Server(moscaSettings);
server.on('ready', setup);
 
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);     
});
 
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});
 
function setup() {
  console.log('Mosca server is up and running')
}
console.log(process.pid);
