const Koa = require("koa");
const app = Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);