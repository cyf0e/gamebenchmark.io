import React, { useState } from "react";
import {
  getResolutionOptions,
  getSettingsOptions,
} from "../../utils/optionsSelector";
import { IBenchmarkFull } from "../../utils/models";
import { ItemBenchmarkEntry } from "./ItemBenchmarkEntry";
import { OptionFilter } from "../OptionFilter";

export const ItemBenchmarkDetails = (props: {
  data: IBenchmarkFull[] | undefined;
  type: string;
}) => {
  const data = props.data ?? [];
  const resolutionOptions = getResolutionOptions(data);
  const settingsOptions = props.type == "game" ? getSettingsOptions(data) : [];
  const [resolution, setResolution] = useState<string>(
    resolutionOptions[0] ? resolutionOptions[0] : ""
  );
  const [settings, setSettings] = useState<string>(
    props.type == "game" && settingsOptions[0] ? settingsOptions[0] : ""
  );
  const filteredData = data.filter((e) => {
    if (props.type == "game")
      return e.resolution == resolution && e.settingstooltip == settings;
    else {
      return e.resolution == resolution;
    }
  });
  const sortedData = filteredData.sort((e1, e2) => {
    if (!e1.averagefps) return 1;
    if (!e2.averagefps) return -1;
    return e2.averagefps - e1.averagefps;
  });
  const findMaxValue = (arr: IBenchmarkFull[]) => {
    let m = 0;
    arr.every((v) => {
      m = Math.max(v.averagefps, v.zeroonefps, v.onefps, m);
      return true;
    });
    return m;
  };
  const maxBenchmarkValue = findMaxValue(data);
  const optionsParams = {
    resolutionOptions,
    settingsOptions,
    setResolution,
    setSettings,
  };
  const gameTitle = data[0] ? (
    <>
      <h2>{data[0].gamename}</h2>
      <i>by {data[0].publisher ?? ""}</i>
    </>
  ) : undefined;
  const componentTitle = data[0] ? (
    <h2>
      {data[0].chipvendor} {data[0].componentname}
    </h2>
  ) : undefined;
  return (
    <>
      {props.type == "game" ? gameTitle : componentTitle}
      <OptionFilter {...optionsParams} />
      {sortedData.length > 0 ? (
        sortedData.map((g) => {
          return props.type == "game" ? (
            <ItemBenchmarkEntry
              type="game"
              maxValue={maxBenchmarkValue}
              data={g}
              key={g.id}
            />
          ) : (
            <ItemBenchmarkEntry
              type="component"
              maxValue={maxBenchmarkValue}
              data={g}
              key={g.id}
            />
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            height: "30rem",
          }}
        >
          {props.type == "game" ? (
            <i>No data for this game.</i>
          ) : (
            <i>No data for this component.</i>
          )}
        </div>
      )}
    </>
  );
};
