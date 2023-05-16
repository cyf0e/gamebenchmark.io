import React from "react";
import { Link, Outlet } from "react-router-dom";
import { API_KEY, setApiKey } from "../../config";
export const Admin = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50rem",
        margin: "auto",
      }}
    >
      <div>
        <Link to="/admin/creategame">
          <button>Create game</button>
        </Link>
        <Link to="/admin/createcomponent">
          <button>Create component</button>
        </Link>
        <Link to="/admin/createbenchmark">
          <button>Create benchmark</button>
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ paddingRight: "1rem" }}>API-Key</span>
        <input
          defaultValue={`${API_KEY}`}
          placeholder="Please enter your api key."
          onChange={(e) => {
            setApiKey(e.currentTarget.value);
          }}
        ></input>
      </div>
      <Outlet />
    </div>
  );
};
