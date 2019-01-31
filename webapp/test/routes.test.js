const server = require("./../index");
const request = require("supertest");
const test = require("ava");
test.afterEach(() => {
  server.close();
});
test("routes: index", async t => {
  const response = await request(server).get("/");
  t.is(response.status, 401);
  t.is(response.type, "application/json");
  t.pass();
});
