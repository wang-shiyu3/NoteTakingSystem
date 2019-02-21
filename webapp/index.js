const dotenv = require('dotenv');
dotenv.config();
const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const router = require("./controllers")
const app = new Koa();
app.use(bodyParser());

app.use(router.routes());

const server = app.listen(3000, ()=>console.log("<-------- Listen on 3000 -------->"));

module.exports = server;