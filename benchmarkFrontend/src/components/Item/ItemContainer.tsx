import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { getAllComponents, getAllGames } from "../../utils/gameApi";
import { Loader } from "../Loader";
import { Sidebar } from "../Sidebar/Sidebar";
export async function gameLoader() {
  const games = await getAllGames();

  return { games: games ?? [], components: [] };
}
export async function componentLoader() {
  const components = await getAllComponents();
  return { components: components ?? [], games: [] };
}
export const ItemContainer = (props: { type: "game" | "component" }) => {
  return (
    <Loader>
      <div className="app-container">
        <Sidebar type={props.type} />
        <div className="item-details-container">
          {props.type == "game" ? (
            <h1>Game Benchmarks</h1>
          ) : (
            <h1>Component Benchmarks</h1>
          )}
          <Outlet />
        </div>
      </div>
    </Loader>
  );
};
