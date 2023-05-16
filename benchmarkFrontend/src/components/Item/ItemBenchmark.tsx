import React from "react";
import { useLoaderData } from "react-router-dom";
import { getComponentBenchmark, getGameBenchmark } from "../../utils/gameApi";
import { IBenchmarkFull } from "../../utils/models";
import { ItemBenchmarkDetails } from "./ItemBenchmarkDetails";
export async function loader({ params }) {
  if (params.game) {
    const data = await getGameBenchmark(params.game);
    return { data, route: Object.keys(params)[0], param: params.game };
  }
  if (params.component) {
    const data = await getComponentBenchmark(params.component);

    return { data, route: Object.keys(params)[0], param: params.component };
  }
  return {};
}

export const ItemBenchmark = () => {
  const { data, route, param } = useLoaderData() as {
    data: IBenchmarkFull[] | undefined;
    route: "game" | "component";
    param: string;
  };

  return (
    <div>
      <ItemBenchmarkDetails key={param} type={route} data={data ?? []} />
    </div>
  );
};
