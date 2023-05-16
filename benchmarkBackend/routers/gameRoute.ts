import express from "express";
import db from "../db/db";
import { authenticate } from "../auth";
import { createGame, validateCreateGame } from "../controllers/gameController";
import { checkValidUUID } from "../controllers/utils";

const gameRouter = express.Router();

gameRouter.get("/", (req, res, next) => {
  db.getAllGames()
    .then((games) => {
      res.json(games);
    })
    .catch((e) => {
      next(e);
    });
});
gameRouter.get("/:id", checkValidUUID, (req, res, next) => {
  if (req.params.id) {
    db.getGameByID(req.params.id)
      .then((ret) => {
        if (ret) {
          res.json(ret);
        } else {
          res.status(404).json({});
        }
      })
      .catch((e) => {
        next(e);
      });
  }
});

gameRouter.post("/create", authenticate, validateCreateGame, createGame);
export default gameRouter;
