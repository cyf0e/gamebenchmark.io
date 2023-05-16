import { API_KEY, BASE_API_URL } from "../config";
import { IBenchmark, IComponent, IGame, ISettings } from "./models";
export async function getAllGames() {
  try {
    const games = await fetch(BASE_API_URL + "/games");
    
    return games.status == 200 ? await games.json() : [];
  } catch (e) {
    console.error(e);
  }
}
export async function getAllComponents() {
  try {
    const components = await fetch(BASE_API_URL + "/components");
    return components.status == 200 ? await components.json() : [];
  } catch (e) {
    console.error(e);
  }
}

export async function getGameBenchmark(id: string) {
  try {
    const gameDetails = await fetch(BASE_API_URL + "/benchmark/game/" + id);
    return gameDetails.status == 200 ? await gameDetails.json() : [];
  } catch (e) {
    console.error(e);
  }
}

export async function getComponentBenchmark(id: string) {
  try {
    const componentDetails = await fetch(
      BASE_API_URL + "/benchmark/component/" + id
    );
    return componentDetails.status == 200 ? componentDetails.json() : [];
  } catch (e) {
    console.error(e);
  }
}
export async function createGame(game: IGame) {
  try {
    const res = await fetchWithAuth(
      BASE_API_URL + "/games/create",
      "post",
      game
    )
    return res
  } catch (e) {
    console.error(e);
  }
}
export async function createComponent(component: IComponent) {
  try {

    const res = await fetchWithAuth(
      BASE_API_URL + "/components/create",
      "post",
      component
    )
    return res
  } catch (e) {
    console.error(e);
  }
}
export async function createBenchmark(benchmark: IBenchmark & ISettings) {
  try {
    const {
      resolution,
      tooltip,
      gameid,
      componentid,
      averagefps,
      zeroonefps,
      onefps,
      note
    } = benchmark;
    const formattedreq = {
      data: { gameid, componentid, averagefps, zeroonefps, onefps, note },
      settings: { resolution, tooltip },
    };
    const res = await fetchWithAuth(
      BASE_API_URL + "/benchmark/create",
      "post",
      formattedreq
    )
    return res
  } catch (e) {
    console.error(e);
  }
}
const fetchWithAuth = (url: string, method: "post", body: any) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "Content-Type,API-Key",
    },
    method: method,
    body: JSON.stringify(body),
  };
  if (API_KEY) {
    options.headers["API-Key"] = API_KEY;
  }
  return fetch(url, options);
};
