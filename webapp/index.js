const dotenv = require("dotenv");
dotenv.config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./controllers");
const app = new Koa();
const { WEB_PORT } = require("./configs/config");
app.use(bodyParser());

app.use(router.routes());

const server = app.listen(WEB_PORT, () =>
  console.log(`<-------- Listen on ${WEB_PORT} -------->`)
);

module.exports = server;
