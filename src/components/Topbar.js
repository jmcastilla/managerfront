// src/components/Topbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Topbar({ userName, onLogout, links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const name = (userName || "Usuario").trim();
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const navLinks = (Array.isArray(links) && links.length
    ? links
    : [
        { to: "/principal", label: "Dashboard" },
        { to: "/ordenes", label: "Órdenes" },
        { to: "/proveedores", label: "Proveedores" },
        { to: "/inventario", label: "Inventario" },
        { to: "/reportes", label: "Reportes" },
        { to: "/configuracion", label: "Configuración" }
      ]);

  return React.createElement(
    "header",
    { className: "tb" },

    // izquierda: marca
    React.createElement(
      "div",
      { className: "tb-left" },
      React.createElement(Link, { to: "/principal", className: "tb-brand" }, "HabiCompras")
    ),

    // centro: links
    React.createElement(
      "nav",
      { className: "tb-menu", role: "navigation" },
      ...navLinks.map((l) => React.createElement(Link, { key: l.to, to: l.to, className: "tb-link" }, l.label))
    ),

    // derecha: usuario + dropdown
    React.createElement(
      "div",
      { className: "tb-right", ref },
      React.createElement(
        "button",
        {
          className: "tb-userbtn",
          onClick: () => setOpen((v) => !v),
          "aria-haspopup": "menu",
          "aria-expanded": open ? "true" : "false",
          title: "Cuenta"
        },
        React.createElement("div", { className: "tb-avatar" }, initial),
        React.createElement("span", { className: "tb-username" }, name),
        React.createElement(
          "svg",
          { className: "tb-caret", viewBox: "0 0 24 24", width: 16, height: 16, fill: "currentColor" },
          React.createElement("path", { d: "M7 10l5 5 5-5z" })
        )
      ),
      open &&
        React.createElement(
          "div",
          { className: "tb-dropdown", role: "menu" },
          React.createElement("div", { className: "tb-dd-sep" }),
          React.createElement(
            "button",
            { className: "tb-dd-item tb-danger", role: "menuitem", onClick: onLogout },
            "Cerrar sesión"
          )
        )
    )
  );
}
