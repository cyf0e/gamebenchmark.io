import db from "../db/db";

export function validateCreateComponent(req, res, next) {
  if (!req.body) {
    res.status(400).json({ error: "Please send component data." });
    return;
  }
  const component = req.body;
  if (!component.name) {
    res.status(400).json({ error: "Component must have a name." });
    return;
  }
  if (!component.type || typeof component.type !== "string") {
    res
      .status(400)
      .json({ error: 'Component must have a string parameter "type".' });
    return;
  }
  next();
}

export function createComponent(req, res, next) {
  db.createComponent(req.body)
    .then((ret) => {
      res.status(201).json(ret);
    })
    .catch((e) => {
      next(e);
    });
}
