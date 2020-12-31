const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./server/router/router.js')
const serve = require('koa-static');

const app = new Koa();
app.use(koaBody({
	multipart: true
}));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token,Authorization');
	// ctx.writeHead(200, {'Content-Type': 'text/plain'})
  await next();
 });

app.use(serve('.'))
// 使用静态文件
app.use(serve('assets'))

// 路由请求
app.use(router.routes()).use(router.allowedMethods())

// 设置请求端口
app.listen(3030,() => {
	console.log('127.0.0.1:3030')
});
