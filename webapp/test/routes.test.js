const server = require("./../index");
const request = require("supertest");
const test = require("ava");
const sequelize = require("./../services/db-connect");

let fetch = null;
test.before(() => {
  fetch = request(server);
});

// test.afterEach(async () => {
//   await server.close();
// });

const fnDelete = async () => {
  await sequelize.query("delete from users where username='123@gmail.com'");
};

test("GET: Faild", async t => {
  fetch.get("/").expect(401);
  t.pass();
});

test("POST: Faild - Invalid Password", async t => {
  const message = await fetch
    .post("/user/register")
    .send({ username: "123@gmail.com", password: "12345" })
    .expect({
      message: [
        "Minimum length 8",
        "Must have uppercase letters",
        "Must have lowercase letters",
        "Must have symbols"
      ]
    });
  await fnDelete();
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
test("POST: Success", async t => {
  await fetch
    .post("/user/register")
    .send({ username: "123@gmail.com", password: "1234Aa56!" })
    .expect({ password: "1234Aa56!", username: "123@gmail.com" });
  await fnDelete();
  t.pass();
});

  fetch
    .get("/")
    .auth("123@gmail.com", "1234Aa56!")
    .expect(200)
    .expect({ time: dayjs().format("HH:mm:ss MM/DD/YYYY") });
  await fnDelete();
  t.pass();
});

test("POST: Faild - Duplicate Name", async t => {
  await fetch
    .post("/user/register")
    .send({ username: "123@gmail.com", password: "1234Aa56!" });
  fetch
    .post("/user/register")
    .send({ username: "123@gmail.com", password: "1234Aa56?" })
    .expect({ message: ["User is existed"] });

  await fnDelete();
  t.pass();
});

test("POST: Success", async t => {
  await request(server)
      .post("/user/register")
      .send({username: '123@gmail.com', password: '1234Aa56!'})
      .expect({password: '1234Aa56!', username: '123@gmail.com',})
  t.pass();
});
