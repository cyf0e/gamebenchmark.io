import React, { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { IComponent, IGame } from "../../utils/models";
import { CategoryButtons } from "./CategoryButtons";
import { SidebarItemList } from "./SidebarItemList";

export const Sidebar = ({ type }: { type: "game" | "component" }) => {
  const data = useLoaderData() as {
    games: IGame[] | undefined;
    components: IComponent[] | undefined;
  };
  const el = useMemo(() => {
    return (
      <div className="sidebar-container">
        <div className="sidebar-navigation-container">
          <CategoryButtons />
        </div>
        <div className="sidebar-item-list-container">
          {<SidebarItemList data={data} type={type} />}
        </div>
      </div>
    );
  }, [type]);
  return el;
};
