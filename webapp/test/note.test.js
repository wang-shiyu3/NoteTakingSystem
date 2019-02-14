const server = require("./../index");
const request = require("supertest");
const test = require("ava");
const Note = require("./../model/note");

let fetch = null;
test.before(() => {
  fetch = request(server);
});

test("Withoutg Authorization", async t => {
  await fetch
      .get("/note/6")
      .expect({message:"Missing Authorization Header"});
  t.pass();
});

test("Creat Note", async t => {
  const note = await Note.create({ });
  await fetch
      .post("/note")
      .set({'Authorization': 'Basic a2sxQGh1c2t5Lm5ldS5lZHU6IVAxOTkwNTI4YW4='})
      .send({"content": "111222"})
      .expect({'id': note.toJSON().id + 1});
  t.pass();
});

test("Update Note", async t => {
  await fetch
      .put("/note/100")
      .set({'Authorization': 'Basic a2sxQGh1c2t5Lm5ldS5lZHU6IVAxOTkwNTI4YW4='})
      .send({"content": "111222"})
      .expect({row_affected: [1]});
  t.pass();
});

test("Get One Note", async t => {
  const note = await Note.find({ where: { uid: 1, id: 6 } })
  const res = await fetch
      .get("/note/6")
      .set({'Authorization': 'Basic a2sxQGh1c2t5Lm5ldS5lZHU6IVAxOTkwNTI4YW4='})
  t.is(res.text, JSON.stringify(note.toJSON()));
});

/*
test("Get All Notes", async t => {
  const res = await fetch
      .get("/note/all")
      .set({'Authorization': 'Basic a2sxQGh1c2t5Lm5ldS5lZHU6IVAxOTkwNTI4YW4='})
  const notes = await Note.findAll({ where: { uid:1 } });
  t.is(res.text, JSON.stringify(notes));
});

test("Delete Note", async t => {
  await fetch
      .delete("/note/214")
      .set({'Authorization': 'Basic a2sxQGh1c2t5Lm5ldS5lZHU6IVAxOTkwNTI4YW4='})
      .send({"content": "111222"})
      .expect({row_affected: 1});
  t.pass();
});
*/



