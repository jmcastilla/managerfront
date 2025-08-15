import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Invcoopi from "./Invcoopi.js";
import Clasificacion from "./Clasificacion.js";
import Invhabib from "./Invhabib.js";
import Alertashabib from "./Alertashabib.js";
import Alertascoopi from "./Alertascoopi.js";
import Sugerido from "./Sugerido.js";
import Login from "./Login.js";
import "./styles.css";

export default function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/invcoopi", element: React.createElement(Invcoopi) }),
      React.createElement(Route, { path: "/alertashabib", element: React.createElement(Alertashabib) }),
      React.createElement(Route, { path: "/alertascoopi", element: React.createElement(Alertascoopi) }),
      React.createElement(Route, { path: "/sugerido", element: React.createElement(Sugerido) }),
      React.createElement(Route, { path: "/invhabib", element: React.createElement(Invhabib) }),
      React.createElement(Route, { path: "/clasificacion", element: React.createElement(Clasificacion) }),
      React.createElement(Route, { path: "/", element: React.createElement(Login) })
    )
  );
}
