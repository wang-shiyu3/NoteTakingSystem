const Note = require("./../model/note");

// If has permission to access this note
const HPTATN = async (ctx, next) => {
  const {
    request: { uid },
    params: { nid }
  } = ctx;

  const note = await Note.findOne({ where: { uid, id: nid } });
  if (!note) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized to this note" };
    return;
  }
  await next();
};
