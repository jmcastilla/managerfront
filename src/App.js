import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Principal.js";
import Login from "./Login.js";
import "./styles.css";

export default function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/principal", element: React.createElement(Home) }),
      React.createElement(Route, { path: "/", element: React.createElement(Login) })
    )
  );
}
