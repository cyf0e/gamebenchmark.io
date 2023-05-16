import express from "express";
import { authenticate } from "../auth";
import {
  createBenchmark,
  validateCreateBenchmark,
} from "../controllers/benchmarkController";
import { checkValidUUID } from "../controllers/utils";
import db from "../db/db";

const benchmarkRouter = express.Router();

benchmarkRouter.get("/game/:id", checkValidUUID, (req, res, next) => {
  if (req.params.id) {
    db.getBenchmarksForGameID(req.params.id)
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).json({});
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});
benchmarkRouter.get("/component/:id", checkValidUUID, (req, res, next) => {
  if (req.params.id) {
    db.getBenchmarksForComponentID(req.params.id)
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).json({});
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});
benchmarkRouter.post(
  "/create",
  authenticate,
  validateCreateBenchmark,
  createBenchmark
);
export default benchmarkRouter;
