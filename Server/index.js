var express = require('express');
const { text } = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
var PORT = process.env.PORT || 8080;
app.get('/', function (req, res) {
  res.status(200).send('El servidor esta ON y esta respondiendo');
});

var messages = [{
  id: 0,
  archivo: '',
  nickname: 'Bienvenido',
  text: 'Aquí podrás enviar un mensaje y archivos a todos los que estén en el servidor '

}];

io.on('connection', function (socket) {
  console.log("Conexión del cliente: " + socket.handshake.address + ". Correcta.");

  socket.emit('messages', messages);

  socket.on('add-message', function (data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });

});

server.listen(PORT, function () {
  console.log(`El Servidor está funcionando en`, PORT);
});
