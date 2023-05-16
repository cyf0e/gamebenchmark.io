import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import {
  createBenchmark,
  getAllComponents,
  getAllGames,
} from "../../utils/gameApi";
import toast, { Toaster } from "react-hot-toast";

import { IBenchmark, ISettings } from "../../utils/models";
export async function loader() {
  const allComponents = await getAllComponents();
  const allGames = await getAllGames();
  return { components: allComponents ?? [], games: allGames ?? [] };
}
export async function action({ request }) {
  const form = await request.formData();
  const benchmarkData = Object.fromEntries(form) as IBenchmark & ISettings;
  console.log(benchmarkData);
  
  const benchmarkResponse = await createBenchmark(benchmarkData);
  const benchmark = await benchmarkResponse?.json();
  if (benchmarkResponse?.status === 201) {
    toast.success(benchmarkResponse?.statusText);
    console.log(benchmarkResponse?.statusText);
    
    console.log(benchmark);
  } else {
    const errorMessage =
      benchmarkResponse?.statusText + ". " + benchmark.error ?? undefined;
    toast.error(errorMessage ?? "There was an error.");
    console.log(benchmark);
  }
  return benchmark ?? {};
}
export const AdminBenchmark = () => {
  const { components, games } = useLoaderData() as {
    components: any[];
    games: any[];
  };
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  useEffect(() => {
    toast.remove();
  },[]);
  return (
    <div>
      <Toaster />
      <Form method="post">
        <label>
          <span>Game </span>
          <select
            name="gameid"
            onChange={(e) => {
              setSelectedGame(e.currentTarget.value);
            }}
          >
            {games.map((g) => {
              return (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <span>Component </span>
          <select
            name="componentid"
            onChange={(e) => {
              setSelectedComponent(e.currentTarget.value);
            }}
          >
            {components.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <span aria-label="Format should be WIDTH x HEIGHT without spaces.">
            Resolution (1920x1080)
          </span>
          <input
            type="text"
            required={true}
            pattern={"^[0-9]+x[0-9]+$"}
            name="resolution"
          />
        </label>
        <label>
          <span>Settings</span>
          <input type="text" required={true} name="tooltip" />
        </label>
        <label>
          <span>Average FPS</span>
          <input type="text" name="averagefps" />
        </label>
        <label>
          <span>1% FPS</span>
          <input type="text" name="onefps" />
        </label>
        <label>
          <span>0.1% FPS</span>
          <input type="text" name="zeroonefps" />
        </label>
        <label>
          <span>Note</span>
          <input type="text" name="note" max={255}/>
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    </div>
  );
};
