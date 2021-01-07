const router = require('koa-router')();

router.post('/enterChat', async(ctx, next) => {
  const params = ctx.request.body;
  const room = { id: params.id }
  ctx.body = {
    code: 200
  }
  console.log(1)
  await next()
})

router.get('/test', async(ctx, next) => {
  ctx.body = {
		data: '11123123123123dasdasd'
	}
})

module.exports = router
