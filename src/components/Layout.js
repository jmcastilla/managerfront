// src/components/Layout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar.js";

export default function Layout({ children, links }) {
  const navigate = useNavigate();
  const userName = (typeof localStorage !== "undefined" && localStorage.getItem("userName")) || "Usuario";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/"); // login
  };

  return React.createElement(
    "div",
    { className: "top-shell" },
    React.createElement(Topbar, { userName, onLogout: handleLogout, links }),
    // 👇 ESTA línea es la clave: renderizar children
    React.createElement("main", { className: "content" }, children)
  );
}
