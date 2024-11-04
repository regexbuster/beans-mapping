import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Root from "./Root/Root";
import ErrorPage from "./Error/Error";

import Index from "./Root/Index/Index";

import DynamicMap from "./Map/Dynamic/DynamicMap";
import StaticMap from "./Map/Static/StaticMap";

import Polyline from "./Polyline/Polyline";
import Bleaching from "./Polyline/Bleaching/Bleaching";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index opts={window.location.search} /> },
      {
        path: "about",
        element: <p>About</p>,
      },
      {
        path: "polyline",
        element: <Polyline />,
      },
      {
        path: "polyline/bleaching",
        element: <Bleaching />,
      },
    ],
  },
  {
    path: "map",
    element: (
      <>
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <p>
            If you've used the polying and bleaching tools try extending the url
            with the polyline for a dynamic map! (/map/dynamic/[polyline])
          </p>
        ),
      },
      {
        path: "static/:aspectRatio/:encodedPolyline",
        element: <StaticMap />,
      },
      {
        path: "dynamic/:encodedPolyline",
        element: <DynamicMap />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
