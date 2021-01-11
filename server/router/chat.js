const WebSocket = require('ws')
const WebSocketServer = require('ws').Server
const chatWSS = new WebSocketServer({ port: 8800 });

// chatWSS.on('connection', function (ws) {
//   var sendStockUpdates = function (ws, ms) {
//     if (ws.readyState == 1) {
//       if (ms.ms) {
//         ws.send(JSON.stringify(ms))
//       } else {
//         ws.send('欢迎'); 
//       }
//     }
//   }
//   // sendStockUpdates(ws);
//   ws.on('message', function (message) {
//     console.log('run')
//     var stockRequest = JSON.parse(message);
//     console.log("收到消息", JSON.stringify(stockRequest));
//     sendStockUpdates(ws, stockRequest);
//   })
// })

const rooms = []
let uuid = require('node-uuid');
const clients = [];

function wsSend(client_uuid, message, type) {
  for (var i = 0; i < clients.length; i++) {
    var clientSocket = clients[i].ws;
    if (clientSocket.readyState === WebSocket.OPEN) {
      try {
        message = JSON.parse(message)
      } catch(error) {
        message = message
      } 
      if (type === 1) {
        clientSocket.send(JSON.stringify({
          "id": client_uuid,
          "name": message.userId,
          "message": message.ms
        }))
      } else {
        clientSocket.send(JSON.stringify({
          "id": client_uuid,
          "message": message
        }))
      }
    }
  }
}
var clientIndex = 1;
chatWSS.on('connection', function(ws) {
  var client_uuid = uuid.v4();
  var nickname = "AnonymousUser" + clientIndex;
  clientIndex += 1;
  clients.push({ "id": client_uuid, "ws": ws });
  console.log('client [%s] connected', client_uuid);
  var connect_message = nickname + " has connected";
  // wsSend(client_uuid, connect_message, 0);
  ws.on('message', function(message) {
    message = JSON.parse(message)
    if (message.ms) {
      wsSend(client_uuid, message, 1)
    } else {
      wsSend(client_uuid, connect_message, 0);
    }
  });
  var closeSocket = function(customMessage) {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].id == client_uuid) {
        var disconnect_message;
        if (customMessage) {
          disconnect_message = customMessage;
        } else {
          disconnect_message = nickname + " has disconnected";
        }
        wsSend(client_uuid, disconnect_message);
        clients.splice(i, 1);
      }
    }
  };
  ws.on('close', function () {
      closeSocket();
  });
  process.on('SIGINT', function () {
      console.log("Closing things");
      closeSocket('Server has disconnected');
      process.exit();
  });
});

module.exports = chatWSS
