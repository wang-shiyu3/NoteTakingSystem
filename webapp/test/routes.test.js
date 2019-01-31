const server = require("./../index");
const request = require("supertest");
const test = require("ava");


test.afterEach(() => {
  server.close();
});

test("GET: Success", async t => {
  const dayjs = require("dayjs");
  await request(server)
      .get("/")
      .auth('username', 'password')
      .expect(200)
      .expect({ time: dayjs().format("HH:mm:ss MM/DD/YYYY")})
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
      .send({username: '123@gmail.com', password: '1234Aa56!'})
      .expect({password: '1234Aa56!', username: '123@gmail.com',})
  t.pass();
});

test("POST: Faild - Invalid Password", async t => {
  await request(server)
      .post("/user/register")
      .send({username: '123@gmail.com', password: '12345'})
      .expect({ message: [ 'Minimum length 8',
          'Must have uppercase letters',
          'Must have lowercase letters',
          'Must have symbols' ]})
  t.pass();

});

test("POST: Faild - Duplicate Name", async t => {
  await request(server)
      .post("/user/register")
      .send({username: '123@gmail.com', password: '1234Aa56!'})
  request(server)
      .post('/user/register')
      .send({username: '123@gmail.com', password: '1234Aa56?'})
      .expect({message: ["User is existed"]})
  t.pass();
});
