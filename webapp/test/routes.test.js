const server = require("./../index");
const request = require("supertest");
const test = require("ava");

test.afterEach(() => {
  server.close();
});

test("GET: Success", async t => {
  await request(server)
      .get("/")
      .auth('username', 'password')
      .expect(200)
  t.pass();
});

test("GET: Faild", async t => {
  await request(server)
      .get("/")
      .expect(401);
  t.pass();
});

test("POST: Success", async t => {
  await request(server)
      .post("/user/register")
      .send({username: '123@gmail.com', pwd: '1234Aa56'})
      .expect(200)
  t.pass();
});

/*test("POST: Faild", async t => {
  await request(server)
      .post("/user/register")
      .set('Authorization', 'token')
      .send({ pwd: '12345' })
      .expect(403)
  t.pass();
});
*/
