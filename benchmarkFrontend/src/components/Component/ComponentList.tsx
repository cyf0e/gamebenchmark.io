/* import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getAllComponents } from "../../utils/gameApi";
import { IComponent } from "../../utils/models";
import { Loader } from "../Loader";
import "../styles/listContainer.css";
export async function loader() {
  const components = await getAllComponents();
  return components ?? [];
} 

export const ComponentList = () => {
  const components = useLoaderData() as IComponent[];
  const [searchFilter, setSearchFilter] = useState<string>("");

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
          <h2>{c.name}</h2>
          <i>{c.chipvendor}</i>
        </div>
      </Link>
    );
  });
  return (
    <>
      <h1>Components</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchFilter(e.currentTarget.value);
        }}
      ></input>
      <div className="item-list-container">
        <Loader paths={["/components"]}>
          {componentElements.length > 0 ? (
            componentElements
          ) : (
            <i>No components match that name.</i>
          )}
        </Loader>
      </div>
    </>
  );
};
 */
