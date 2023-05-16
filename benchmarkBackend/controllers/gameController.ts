import db from "../db/db";

export function validateCreateGame(req, res, next) {
  if (!req.body) {
    res.status(400).json({ error: "You must send a game to create." });
    return;
  }
  const game = req.body;
  if (!game.name) {
    res.status(400).json({ error: "Game must have a name." });
    return;
  }
  next();
}
export function createGame(req, res, next) {
  db.createGame(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e) => {
      next(e);
    });
}
