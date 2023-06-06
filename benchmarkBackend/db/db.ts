import { Pool, PoolConfig, QueryResult } from "pg";
import { IBenchmark, IComponent, ISettings } from "./models";
import { IGame } from "./models";

class db {
  pool: Pool;
  config: PoolConfig;
  constructor() {
    this.config = {
      port: (process.env.DATABASE_PORT as number | undefined) || 5432,
      user: process.env.DATABASE_USER,
      host: process.env.DOCKER_DATABASE_URL || process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    };
    console.log(this.config);
    this.pool = new Pool(this.config);
  }
  resultOrUndefined(res: QueryResult) {
    if (res.rowCount > 0) {
      return res.rows;
    } else {
      return undefined;
    }
  }

  async query(queryText: string, variables: any[] = []) {
    return this.pool.query(queryText, variables);
  }

  async createGame(gameData: IGame): Promise<IGame[] | undefined> {
    let { id, name, description, publisher } = gameData;
    const res = await this.query(
      "INSERT INTO game (name,description,publisher) VALUES ($1,$2,$3) RETURNING *",
      [name, description, publisher]
    );

    return this.resultOrUndefined(res);
  }

  async getAllGames(): Promise<IGame[] | undefined> {
    const games = await this.query("SELECT * FROM game");
    return this.resultOrUndefined(games);
  }

  async getGameByID(identifier: string): Promise<IGame[] | undefined> {
    const games = await this.query("SELECT * FROM game WHERE game.id = $1", [
      identifier,
    ]);
    return this.resultOrUndefined(games);
  }

  async getAllComponents(): Promise<IComponent[] | undefined> {
    const components = await this.query("SELECT * FROM componentData");
    return this.resultOrUndefined(components);
  }

  async getComponentByID(
    identifier: string
  ): Promise<IComponent[] | undefined> {
    const components = await this.query(
      "SELECT * FROM component WHERE component.id = $1",
      [identifier]
    );
    return this.resultOrUndefined(components);
  }

  async createComponent(
    component: IComponent
  ): Promise<IComponent[] | undefined> {
    const { name, description, productvendor, chipvendor, type } = component;

    const typeid = (
      await this.query("SELECT * FROM componenttypes WHERE category=$1", [type])
    ).rows;

    const ret = await this.query(
      "INSERT INTO component(name,description,productvendor,chipvendor,typeid) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, description, productvendor, chipvendor, typeid[0].typeid]
    );
    return this.resultOrUndefined(ret);
  }

  async getBenchmarksForGameID(gameID: string) {
    if (!gameID) return;
    const results = await this.query(
      "SELECT * FROM benchmarkfull WHERE gameid=$1",
      [gameID]
    );
    return this.resultOrUndefined(results);
  }

  async getBenchmarksForComponentID(componentID: string) {
    if (!componentID) return;
    const results = await this.query(
      "SELECT * FROM benchmarkfull WHERE componentid=$1",
      [componentID]
    );
    return this.resultOrUndefined(results);
  }

  parseNumber(number: string | number | undefined) {
    if (typeof number == "string") {
      const num = parseFloat(number);
      return isNaN(num) ? 0 : num;
    }
    return number ?? 0;
  }

  async createBenchmark(benchmark: { data: IBenchmark; settings: ISettings }) {
    const { data, settings } = benchmark;
    const { gameid, componentid, averagefps, zeroonefps, onefps, note } = data;

    const existingSetting = await this.query(
      "SELECT * FROM gamesettings WHERE resolution=$1 AND tooltip=$2 AND gameid=$3",
      [settings.resolution, settings.tooltip, gameid]
    );

    const settingsID =
      existingSetting.rowCount > 0
        ? existingSetting.rows[0].id
        : (
            await this.query(
              "INSERT INTO gamesettings(gameid,resolution,tooltip) VALUES($1,$2,$3) RETURNING (id)",
              [gameid, settings.resolution, settings.tooltip]
            )
          ).rows[0].id;

    const ret = await this.query(
      "INSERT INTO benchmarkresult (gameid,componentid,settings,averagefps,zeroonefps,onefps,note) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        gameid,
        componentid,
        settingsID,
        this.parseNumber(averagefps),
        this.parseNumber(zeroonefps),
        this.parseNumber(onefps),
        note,
      ]
    );
    return this.resultOrUndefined(ret);
  }
}

export default new db();
