import request from "supertest";
import assert from "node:assert";
import dotenv from "dotenv";
import app from "../server";
import { IComponent, IGame } from "../db/models";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
//seed some benchmark data
var validGameID = "";
var validComponentID = "";
var validBenchmarkID = "";
before(async () => {
  const game: IGame = { name: "Banjo Kazooie" };
  const component: IComponent = { name: "RX 580", type: "GPU" };
  let gid = await request(app)
    .post("/games/create")
    .set("Content-Type", "application/json")
    .set("API-Key", `${process.env.ADMIN_API_KEY}`)
    .send(game);
  gid = gid.body[0].id;
  let cid = await request(app)
    .post("/components/create")
    .set("Content-Type", "application/json")
    .set("API-Key", `${process.env.ADMIN_API_KEY}`)
    .send(component);
  cid = cid.body[0].id;
  validGameID = gid as unknown as string;
  validComponentID = cid as unknown as string;
  const benchmark = {
    data: {
      gameid: gid,
      componentid: cid,
      averagefps: 231,
    },
    settings: {
      resolution: "1920x1080",
      tooltip: "Very High",
    },
  };
  let b = await request(app)
    .post("/benchmark/create")
    .set("Content-Type", "application/json")
    .set("API-Key", `${process.env.ADMIN_API_KEY}`)
    .send(benchmark);
  validBenchmarkID = b.body[0];
});
describe("GET / ", function () {
  it("should return 404", function (done) {
    request(app).get("/").expect(404, done);
  });
});
describe("/games", function () {
  describe("GET /games", function () {
    it("should return 200", function (done) {
      request(app).get("/games").expect(200, done);
    });
  });
  describe("GET /games/:id", function () {
    it("should return 400 if the param is not a valid uuid", function (done) {
      request(app)
        .get("/games/invaliduuid")
        .expect(400, { error: "Identifier is not a valid uuid string." }, done);
    });
    it("should return game information for existing game", async function () {
      request(app)
        .get(`/games/${validGameID}`)
        .set("Content-Type", "application/json")
        .expect(200)
        .end((err, res) => {
          const gi = res.body[0];
          assert.strictEqual("Banjo Kazooie", gi.name);
        });
    });
  });

  describe("POST /create", function () {
    it("should 201 after successful post", function (done) {
      const game: IGame = {
        name: "Fortnites",
        description: "Battle Royale game",
        publisher: "Epic Games",
      };

      request(app)
        .post("/games/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(game)
        .expect(201, done);
    });
    it("should return the created game as json", function (done) {
      const game = {
        name: "Apex Legends",
        description: "Battle Royale game",
        publisher: "Electronic Arts",
      };

      request(app)
        .post("/games/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(game)
        .expect("Content-Type", "application/json")
        .expect(201)
        .end((err, res) => {
          const g = res.body[0];
          assert(
            g.name == game.name &&
              game.description == g.description &&
              g.publisher == game.publisher
          );
          done();
        });
    });
  });
});
describe("/components", function () {
  describe("GET /components", function () {
    it("should return 200", function (done) {
      request(app).get("/components").expect(200, done);
    });
  });
  describe("/components/:id", function () {
    it("should return 400 if the param is not a valid uuid", function (done) {
      request(app)
        .get("/components/invaliduuid")
        .expect(400, { error: "Identifier is not a valid uuid string." }, done);
    });
    it("should return component information for existing component", async function () {
      request(app)
        .get(`/components/${validComponentID}`)
        .set("Content-Type", "application/json")
        .expect(200)
        .end((err, res) => {
          const c = res.body[0] as IComponent;
          assert.strictEqual(c.name, "RX 580");
        });
    });
  });
  describe("POST /", function () {
    describe("/components/create", function () {
      it("should return 201 on successful create", function (done) {
        const comp: IComponent = {
          name: "RTX 4080",
          type: "GPU",
          chipvendor: "NVidia",
          productvendor: "Gigabyte",
          description: "High end graphics card",
        };
        request(app)
          .post("/components/create")
          .set("Content-Type", "application/json")
          .set("API-Key", `${process.env.ADMIN_API_KEY}`)
          .send(comp)
          .expect(201, done);
      });
      it("should return component on successful create", function (done) {
        const comp: IComponent = {
          name: "RTX 4070",
          type: "GPU",
          chipvendor: "NVidia",
          productvendor: "Gigabyte",
          description: "High end graphics card",
        };
        request(app)
          .post("/components/create")
          .set("Content-Type", "application/json")
          .set("API-Key", `${process.env.ADMIN_API_KEY}`)
          .send(comp)
          .expect(201, done);
      });
      it("should return 401 if no API key", function (done) {
        const comp: IComponent = {
          name: "RTX 4010",
          type: "GPU",
          chipvendor: "NVidia",
          productvendor: "Gigabyte",
          description: "High end graphics card",
        };
        request(app)
          .post("/components/create")
          .set("Content-Type", "application/json")
          .send(comp)
          .expect(401, done);
      });
    });
  });
});

describe("/benchmarks", function () {
  describe("POST /create", function () {
    it("should return 401 if no API key", function (done) {
      request(app)
        .post("/benchmark/create")
        .set("Content-Type", "application/json")
        .send({ data: "random data" })
        .expect(401, done);
    });
    it("should return 201 if created", async function () {
      const game: IGame = { name: "GTA 5" };
      const component: IComponent = { name: "RX 590", type: "GPU" };
      let gid = await request(app)
        .post("/games/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(game);
      gid = gid.body[0].id;
      let cid = await request(app)
        .post("/components/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(component);
      cid = cid.body[0].id;
      const benchmark = {
        data: {
          gameid: gid,
          componentid: cid,
          averagefps: 231,
        },
        settings: {
          resolution: "1920x1080",
          tooltip: "Very High",
        },
      };
      let b = await request(app)
        .post("/benchmark/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(benchmark);
      assert(b.statusCode === 201);
    });
    it("should return benchmark data if created", async function () {
      const game: IGame = { name: "GTA 6" };
      const component: IComponent = { name: "RTX 5900", type: "GPU" };
      let gid = await request(app)
        .post("/games/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(game);
      gid = gid.body[0].id;
      let cid = await request(app)
        .post("/components/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(component);
      cid = cid.body[0].id;
      const benchmark = {
        data: {
          gameid: gid,
          componentid: cid,
          averagefps: 221,
        },
        settings: {
          resolution: "1920x1080",
          tooltip: "Very High",
        },
      };
      let b = await request(app)
        .post("/benchmark/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(benchmark);
      const r = b.body[0];
      assert(b.statusCode === 201);
      assert(r.gameid === benchmark.data.gameid);
      assert(r.componentid === benchmark.data.componentid);
      assert(r.averagefps === benchmark.data.averagefps);
    });
    it("should upload the note", async function () {
      const game: IGame = { name: "GTA 7" };
      const component: IComponent = { name: "RTX 4060", type: "GPU" };
      let gid = await request(app)
        .post("/games/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(game);
      gid = gid.body[0].id;
      let cid = await request(app)
        .post("/components/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(component);
      cid = cid.body[0].id;
      const benchmark = {
        data: {
          gameid: gid,
          componentid: cid,
          averagefps: 221,
          note: "DDR5 6200Mhz",
        },
        settings: {
          resolution: "1920x1080",
          tooltip: "Very High",
        },
      };
      let b = await request(app)
        .post("/benchmark/create")
        .set("Content-Type", "application/json")
        .set("API-Key", `${process.env.ADMIN_API_KEY}`)
        .send(benchmark);
      const r = b.body[0];
      assert(b.statusCode === 201);
      assert(r.note === benchmark.data.note);
    });
  });
  describe("GET /game/:id", function () {
    it("should return 200 if the game exists", async function () {
      const res = await request(app)
        .get("/benchmark/game/" + validGameID)
        .set("Content-Type", "application/json");
      assert(res.body[0].averagefps == 231);
      assert.strictEqual(res.status, 200);
    });
    it("should return 400 if the param is not a valid uuid", function (done) {
      request(app)
        .get("/benchmark/game/invaliduuid")
        .expect(400, { error: "Identifier is not a valid uuid string." }, done);
    });
    it("should return 404 if the game doesnt exist", async function () {
      const res = await request(app).get("/benchmark/game/" + uuidv4());
      assert.strictEqual(res.statusCode, 404);
    });
  });
  describe("GET /component/:id", function () {
    it("should return 200 if the component exists", async function () {
      const res = await request(app)
        .get("/benchmark/component/" + validComponentID)
        .set("Content-Type", "application/json");
      assert.strictEqual(res.statusCode, 200);
    });
    it("should return 400 if the param is not a valid uuid", function (done) {
      request(app)
        .get("/benchmark/component/invaliduuid")
        .expect(400, { error: "Identifier is not a valid uuid string." }, done);
    });
    it("should return 404 if the component doesnt exist", async function () {
      const res = await request(app).get("/benchmark/component/" + uuidv4());
      assert.strictEqual(res.statusCode, 404);
    });
  });
});
