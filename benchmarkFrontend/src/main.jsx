import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  gameLoader,
  componentLoader,
  ItemContainer,
} from "./components/Item/ItemContainer";
import {
  ItemBenchmark,
  loader as itemLoader,
} from "./components/Item/ItemBenchmark";
import { Admin } from "./components/Admin/Admin";
import { AdminComponent } from "./components/Admin/AdminComponent";
import { AdminGame } from "./components/Admin/AdminGame";
import { AdminBenchmark } from "./components/Admin/AdminBenchmark";
import { action as adminGameAction } from "./components/Admin/AdminGame";
import { action as adminComponentAction } from "./components/Admin/AdminComponent";
import {
  loader as adminBenchmarkLoader,
  action as adminBenchmarkAction,
} from "./components/Admin/AdminBenchmark";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/games",
        element: <ItemContainer type="game" />,
        errorElement: <h1>Sorry there was an error.</h1>,
        loader: gameLoader,
        children: [
          {
            index: true,
            element: <h3>Please select a game from the sidebar.</h3>,
          },
          {
            path: "/games/:game",
            loader: itemLoader,
            element: <ItemBenchmark />,
          },
        ],
      },
      {
        path: "/components",
        element: <ItemContainer type="component" />,
        loader: componentLoader,

        children: [
          {
            index: true,
            element: <h3>Please select a component from the sidebar.</h3>,
          },
          {
            path: "/components/:component",
            loader: itemLoader,
            element: <ItemBenchmark />,
          },
        ],
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin/createcomponent",
            element: <AdminComponent />,
            action: adminComponentAction,
          },
          {
            path: "/admin/creategame",
            element: <AdminGame />,
            action: adminGameAction,
          },
          {
            path: "/admin/createbenchmark",
            element: <AdminBenchmark />,
            loader: adminBenchmarkLoader,
            action: adminBenchmarkAction,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
