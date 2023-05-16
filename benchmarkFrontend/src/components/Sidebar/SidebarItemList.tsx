import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IComponent, IGame } from "../../utils/models";
import { Loader } from "../Loader";

export const SidebarItemList = (props: {
  data: {
    games: IGame[] | undefined;
    components: IComponent[] | undefined;
  };
  type: "game" | "component";
}) => {
  const games = props.data.games ?? [];
  const components = props.data.components ?? [];
  const [searchFilter, setSearchFilter] = useState<string>("");
  const createGames = () => {
    const filteredGames = games.filter((g) => {
      return g.name.toLowerCase().includes(searchFilter);
    });
    const gameElements = filteredGames.map((game) => {
      return (
        <Link key={game.id} to={`/games/${game.id}`}>
          <div className="item-list-title-container">
            <h4>{game.name}</h4>
            <i>{game.publisher}</i>
          </div>
        </Link>
      );
    });
    return gameElements.length > 0 ? (
      gameElements
    ) : (
      <i>No games match that name.</i>
    );
  };
  const createComponents = () => {
    const filteredComponents = components.filter((c) => {
      return (
        c.chipvendor?.toLowerCase().includes(searchFilter) ||
        c.name.toLowerCase().includes(searchFilter)
      );
    });
    const componentElements = filteredComponents.map((c) => {
      return (
        <Link key={c.id} to={`/components/${c.id}`}>
          <div className="item-list-title-container">
            <h4>{c.name}</h4>
            <i>{c.chipvendor}</i>
          </div>
        </Link>
      );
    });
    return componentElements.length > 0 ? (
      componentElements
    ) : (
      <i>No games match that name.</i>
    );
  };
  return (
    <>
      <h2>All {props.type == "game" ? "games" : "components"}</h2>

      <input
      className="search-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchFilter(e.currentTarget.value);
        }}
      ></input>
      <div className="item-list-container">
        {props.type == "game" ? createGames() : createComponents()}
      </div>
    </>
  );
};
