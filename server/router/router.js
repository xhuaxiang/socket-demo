const router = require('koa-router')();
const dayjs = require('dayjs')

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


router.post('/enterChat', async(ctx, next) => {
  const params = ctx.request.body;
  const room = { id: params.id }
  ctx.body = {
    code: 200
  }
  console.log(1)
  await next()
})

router.post('/chartsList', async(ctx, next) => {
  const params = ctx.request.body
  const res = []
  for (let i = 0; i < 20; i++) {
    randomStockUpdater();
    res.push({
      name: dayjs(new Date().getTime() - 1000 * i).format('YYYY/MM/DD HH:mm:ss'),
      value: [dayjs(new Date().getTime() - 1000 * i).format('YYYY/MM/DD HH:mm:ss'), stocks.AAPL]
    })
  }
  res.reverse()
  ctx.body = {
    code: 200,
    data: res
  }
})

router.get('/test', async(ctx, next) => {
  ctx.body = {
		data: '11123123123123dasdasd'
	}
})

module.exports = router
