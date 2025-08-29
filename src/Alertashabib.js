// src/Principal.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout.js";
import DataTable from "./components/DataTable.js";

// Usa la ruta relativa si tienes proxy en webpack:
// devServer.proxy["/api/coopidrogas"] -> http://localhost:5000
const API_URL = "http://146.190.75.181:5000/api/alertashabib";
// Si NO tienes proxy, usa la URL completa (puede dar CORS en dev):
// const API_URL = "http://localhost:5000/api/coopidrogas";

export default function Invcoopi() {

  const navigate = useNavigate();
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) navigate("/");
  }, []);

  const links = [
    { to: "/invcoopi", label: "Inv Coopidrogas" },
    { to: "/clasificacion", label: "Clasificacion ABC" },
    { to: "/invhabib", label: "Inv Bodegas" },
    { to: "/alertashabib", label: "Alertas Bodegas" },
    { to: "/alertascoopi", label: "Alertas Coopidrogas" },
    { to: "/sugerido", label: "Sugerido Pedido" },
    { to: "/diasinventario", label: "Dias Inventario" }
  ];

  const columns = [
    { key: "idalerta", header: "ID ALERTA" },
    { key: "sku", header: "SKU" },
    { key: "nombre", header: "Descripción" },
    { key: "bod", header: "Cod Bodega" },
    { key: "stock", header: "Stock" },
    { key: "estado", header: "Estado" },
    { key: "rot30", header: "Rot 30" },
    { key: "rot60", header: "Rot 60" },
    { key: "rot90", header: "Rot 90" },
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
      "📦 Alertas Bodegas"
    ),

    React.createElement(DataTable, {
      fetchUrl: API_URL,
      columns,
      pageSize: 10,
      exportFileName: "alertasbodega.xlsx",
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      }
    })
  );
}
