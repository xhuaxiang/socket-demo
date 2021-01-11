const router = require('koa-router')();
const WebSocketServer = require('ws').Server

var stocks = {
  "AAPL": 95.0,
  "MSFT": 50.0,
  "AMZN": 300.0,
  "GOOG": 550.0,
  "YHOO": 35.0
}
var delay = 10000

function randomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var stockUpdater;
var randomStockUpdater = function() {
  for (var symbol in stocks) {
    if(stocks.hasOwnProperty(symbol)) {
      var randomizedChange = randomInterval(-150, 150);
      var floatChange = randomizedChange / 100;
      stocks[symbol] += floatChange;
    }
  }
  var randomMSTime = randomInterval(500, 2500);
  stockUpdater = setTimeout(function() {
    randomStockUpdater();
  }, randomMSTime);
}
randomStockUpdater();

wss = new WebSocketServer({ port: 8888 });
wss.on('connection', function (ws) {
  var sendStockUpdates = function (ws) {
    if (ws.readyState == 1) {
      ws.send(JSON.stringify(stocks));//需要将对象转成字符串。WebSocket只支持文本和二进制数据
      console.log("更新", JSON.stringify(stocks));
    }
  }
  // sendStockUpdates(ws);
  var clientStockUpdater = setInterval(function () {
      sendStockUpdates(ws);
  }, delay);
  ws.on('message', function (message) {
    var stockRequest = message;//根据请求过来的数据来更新。
    delay = stockRequest
    if (typeof +delay !== 'number') {
      return
    }
    clearInterval(clientStockUpdater)
    clientStockUpdater = setInterval(() => {
      sendStockUpdates(ws);
      console.log('hello')
    }, delay)
    console.log("收到消息", stockRequest);
    // sendStockUpdates(ws);
  })
})


module.exports = wss
