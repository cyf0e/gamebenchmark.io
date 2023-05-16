import request from "supertest";
import express from "express";
import { validateCreateGame } from "../controllers/gameController";
import { validateCreateComponent } from "../controllers/componentController";
import { validateCreateBenchmark } from "../controllers/benchmarkController";
import { checkValidUUID } from "../controllers/utils";
import { v4 as uuidv4 } from "uuid";

describe("validateGame", function () {
  it("returns 200 for a working request", function (done) {
    const game = { name: "Fortnite", description: "Battle Royale" };
    request(postServer(validateCreateGame))
      .post("/")
      .send(game)
      .expect(200, done);
  });
  it("returns 400 when the game has no name", function (done) {
    const game = { description: "Battle Royale" };
    request(postServer(validateCreateGame))
      .post("/")
      .send(game)
      .expect(400, { error: "Game must have a name." }, done);
  });
  it("returns 400 when no request body is sent", function (done) {
    request(postServer(validateCreateGame)).post("/").expect(400, done);
  });
});
describe("validateComponent", function () {
  it("returns 200 for a working request", function (done) {
    const component = {
      name: "RTX 4090",
      description: "High end gpu",
      type: "GPU",
    };
    request(postServer(validateCreateComponent))
      .post("/")
      .send(component)
      .expect(200, done);
  });
  it("returns 400 when the component has no name", function (done) {
    const component = { description: "High end gpu", type: "GPU" };
    request(postServer(validateCreateComponent))
      .post("/")
      .send(component)
      .expect(400, { error: "Component must have a name." }, done);
  });
  it("returns 400 when the component has no type", function (done) {
    const component = { name: "RTX 4090", description: "High end gpu" };
    request(postServer(validateCreateComponent))
      .post("/")
      .send(component)
      .expect(
        400,
        { error: 'Component must have a string parameter "type".' },
        done
      );
  });
  it("returns 400 when no request body is sent", function (done) {
    request(postServer(validateCreateComponent)).post("/").expect(400, done);
  });
});
describe("validateBenchmark", function () {
  it("returns 200 for a working request", function (done) {
    const benchmark = {
      data: { gameid: "string", componentid: "string", averagefps: 23 },
      settings: {
        resolution: "1920x1080",
        tooltip: "Very High",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(200, done);
  });
  it("returns 400 for a request with no settings", function (done) {
    const benchmark = {
      data: { gameid: "string", componentid: "string", averagefps: 23 },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
  it("returns 400 for a request with no data", function (done) {
    const benchmark = {
      settings: {
        resolution: "1920x1080",
        tooltip: "Very High",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
  it("returns 400 for a request with no gameid", function (done) {
    const benchmark = {
      data: { componentid: "string", averagefps: 23 },
      settings: {
        resolution: "1920x1080",
        tooltip: "Very High",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
  it("returns 400 for a request with no component id", function (done) {
    const benchmark = {
      data: { gameid: "string", averagefps: 23 },
      settings: {
        resolution: "1920x1080",
        tooltip: "Very High",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
  it("returns 400 for a request with no fps data", function (done) {
    const benchmark = {
      data: { gameid: "string", componentid: "string" },
      settings: {
        resolution: "1920x1080",
        tooltip: "Very High",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
  it("returns 400 for a request with no resolution", function (done) {
    const benchmark = {
      data: { gameid: "string", componentid: "string", averagefps: 23 },
      settings: {
        tooltip: "Very High",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
  it("returns 400 for a request with no settings tooltip", function (done) {
    const benchmark = {
      data: { gameid: "string", componentid: "string", averagefps: 23 },
      settings: {
        resolution: "1920x1080",
      },
    };
    request(postServer(validateCreateBenchmark))
      .post("/")
      .send(benchmark)
      .expect(400, done);
  });
});
describe("validate uuid", function () {
  it("returns 400 for invalid uuid requests", function (done) {
    request(idServer(checkValidUUID)).get("/invaliduuid").expect(400, done);
  });
  it("returns 200 for valid requests", function (done) {
    request(idServer(checkValidUUID)).get(`/${uuidv4()}`).expect(200, done);
  });
});
const postServer = (fn) => {
  const server = express();
  server.use(express.json());
  server.post("/", fn, (req, res) => {
    res.sendStatus(200);
  });
  return server;
};
const idServer = (fn) => {
  const server = express();
  server.use(express.json());
  server.get("/:id", fn, (req, res) => {
    res.sendStatus(200);
  });
  return server;
};
