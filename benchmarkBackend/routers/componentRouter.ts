import express from "express";
import db from "../db/db";
import { authenticate } from "../auth";
import {
  createComponent,
  validateCreateComponent,
} from "../controllers/componentController";
import { checkValidUUID } from "../controllers/utils";
const componentRouter = express.Router();

componentRouter.get("/", (req, res, next) => {
  db.getAllComponents()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      next(e);
    });
});
componentRouter.get("/:id", checkValidUUID, (req, res, next) => {
  if (!req.params.id) return;

  db.getComponentByID(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({});
      }
    })
    .catch((e) => next(e));
});
componentRouter.post(
  "/create",
  authenticate,
  validateCreateComponent,
  createComponent
);
export default componentRouter;
