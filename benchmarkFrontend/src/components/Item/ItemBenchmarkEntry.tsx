import React from "react";
import { IBenchmarkFull } from "../../utils/models";
import { GraphBar } from "../GraphElements/GraphBar";
export const ItemBenchmarkEntry = (props: {
  data: IBenchmarkFull;
  type: "game" | "component";
  maxValue: number;
}) => {
  const { maxValue, type, data } = props;
  return (
    <div key={data.id}>
      <b style={{ display: "inline-block", margin: ".2rem 0" }}>
        {type == "game" ? data.componentname : data.gamename}
      </b>
      <i>{type == "component" ? " - " + data.settingstooltip : ""}</i>
      <i>{data.note?"Note: " + data.note:""}</i>
      <GraphBar
        title="Average FPS"
        value={data.averagefps ?? 0}
        maxValue={maxValue}
        color="red"
      />
      <GraphBar
        title="1% Low"
        value={data.onefps ?? 0}
        maxValue={maxValue}
        color="green"
      />
      <GraphBar
        title="0.1%"
        value={data.zeroonefps ?? 0}
        maxValue={maxValue}
        color="blue"
      />
    </div>
  );
};
