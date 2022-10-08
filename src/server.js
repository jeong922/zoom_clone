import http from 'http';
import express from 'express';
// import WebSocket from 'ws';
import SocketIO from 'socket.io';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
  socket.on('enter_room', (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done('hello from the backend');
    }, 10000);
  });
});

/* const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'anonymous';
  console.log('Conneted to Browser ✅');
  socket.on('close', () => {
    console.log('Conneted from the Browser ❌');
  });
  socket.on('message', (m) => {
    const message = JSON.parse(m);
    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
        aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
        case 'nickname':
          socket['nickname'] = message.payload;
          break;
        }
      });
    }); */

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
