// src/Principal.js
import React from "react";
import Layout from "./components/Layout.js";
import DataTable from "./components/DataTable.js";

// Usa la ruta relativa si tienes proxy en webpack:
// devServer.proxy["/api/coopidrogas"] -> http://localhost:5000
const API_URL = "http://localhost:5000/api/coopidrogas";
// Si NO tienes proxy, usa la URL completa (puede dar CORS en dev):
// const API_URL = "http://localhost:5000/api/coopidrogas";

export default function Principal() {
  const links = [
    { to: "/principal", label: "Inv Coopidrogas" },
    { to: "/ordenes", label: "Órdenes" },
    { to: "/proveedores", label: "Proveedores" },
    { to: "/inventario", label: "Inventario" },
    { to: "/reportes", label: "Reportes" },
    { to: "/configuracion", label: "Configuración" }
  ];

  const columns = [
    { key: "sku", header: "SKU" },
    { key: "descripcion", header: "Descripción" },
    { key: "ean", header: "EAN" },
    { key: "proveedor", header: "Proveedor" },
    { key: "corriente", header: "Corriente" },
    { key: "precioreal", header: "Precio Real" },
    { key: "bonificacion", header: "Bonificación" },
    { key: "disponible", header: "Disponible" },
    { key: "maximo", header: "Máximo" }
  ];

  return React.createElement(
    Layout,
    { links },
    React.createElement(
      "h2",
      {
        style: {
          color: "white",
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
          padding: "10px 20px",
          borderRadius: "6px",
          fontFamily: "Arial, sans-serif",
          fontSize: "1.5rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          marginBottom: "15px"
        }
      },
      "📦 Inventario Coopidrogas"
    ),

    React.createElement(DataTable, {
      fetchUrl: API_URL,
      columns,
      pageSize: 10,
      exportFileName: "inventario_coopidrogas.xlsx"
    })
  );
}
