const Koa = require("koa");
const router = require("./controllers")
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

app.use(router.routes());

const server = app.listen(3000, ()=>console.log("<-------- Listen on 3000 -------->"));

module.exports = server;