// src/components/DataTable.js
import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

/**
 * props:
 * - data: array de objetos (opcional si usas endpoint)
 * - columns: [{ key: 'campo', header: 'Título' }]
 * - pageSize: número (default 10)
 * - fetchUrl: string (si lo pasas, hace fetch y rellena data)
 * - fetchOptions: init de fetch (headers, method, etc.)
 * - exportFileName: string (nombre del archivo .xlsx) -> default "datos.xlsx"
 */
export default function DataTable({ data, columns, pageSize = 10, fetchUrl, fetchOptions, exportFileName = "datos.xlsx" }) {
  const [innerData, setInnerData] = useState(Array.isArray(data) ? data : []);
  const [loading, setLoading] = useState(!!fetchUrl);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);

  // Carga desde endpoint si fetchUrl está definido
  useEffect(() => {
    if (!fetchUrl) return;
    const ac = new AbortController();
    setLoading(true); setError(null);
    fetch(fetchUrl, { signal: ac.signal, ...(fetchOptions || {}) })
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(json => {
        // Soporta: array directo, { data: [...] }, { rows: [...] }
        const arr = Array.isArray(json)
          ? json
          : (Array.isArray(json?.data)
              ? json.data
              : (Array.isArray(json?.rows) ? json.rows : []));
        setInnerData(arr);
      })
      .catch(e => { if (e.name !== "AbortError") setError(e.message || "Error de red"); })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [fetchUrl]);

  const cols = useMemo(() => {
    if (Array.isArray(columns) && columns.length) return columns;
    const first = innerData[0];
    if (!first) return [];
    return Object.keys(first).map(k => ({ key: k, header: toTitle(k) }));
  }, [columns, innerData]);

  const filtered = useMemo(() => {
    if (!q) return innerData;
    const needle = q.toLowerCase();
    return innerData.filter(row =>
      cols.some(c => String(row[c.key] ?? "").toLowerCase().includes(needle))
    );
  }, [innerData, q, cols]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const dir = sort.dir === "asc" ? 1 : -1;
    const key = sort.key;
    return [...filtered].sort((a, b) => {
      const va = a[key]; const vb = b[key];
      if (va == null && vb == null) return 0;
      if (va == null) return -1 * dir;
      if (vb == null) return 1 * dir;
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
      return String(va).localeCompare(String(vb), undefined, { numeric: true }) * dir;
    });
  }, [filtered, sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  function toTitle(x) {
    return String(x)
      .replace(/[_\-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, s => s.toUpperCase());
  }

  function toggleSort(k) {
    setPage(1);
    setSort((s) => {
      if (s.key !== k) return { key: k, dir: "asc" };
      return { key: k, dir: s.dir === "asc" ? "desc" : "asc" };
    });
  }

  // ===== Exportar a Excel (usa filas filtradas+ordenadas, sin paginar) =====
  function handleExport() {
    // Mapea con headers "bonitos"
    const out = sorted.map(row => {
      const obj = {};
      cols.forEach(c => {
        const header = c.header || c.key;
        obj[header] = row[c.key] != null ? row[c.key] : "";
      });
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(out);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, exportFileName);
  }

  // UI helpers
  const Th = (c) =>
    React.createElement(
      "th",
      {
        key: c.key,
        onClick: () => toggleSort(c.key),
        className: "dt-th",
        title: "Ordenar"
      },
      c.header,
      sort.key === c.key
        ? React.createElement("span", { className: "dt-sort" }, sort.dir === "asc" ? " ▲" : " ▼")
        : null
    );

  const Td = (c, row, i) =>
    React.createElement("td", { key: c.key, className: "dt-td" }, stringify(row[c.key]));

  function stringify(v) {
    if (v == null) return "";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }

  return React.createElement(
    "section",
    { className: "dt-wrap" },

    // Toolbar: búsqueda + contador + export
    React.createElement(
      "div",
      { className: "dt-toolbar" },
      React.createElement("input", {
        className: "dt-search",
        placeholder: "Buscar…",
        value: q,
        onChange: (e) => { setQ(e.target.value); setPage(1); }
      }),
      React.createElement(
        "div",
        { style: { display: "flex", gap: "8px", alignItems: "center" } },
        React.createElement("div", { className: "dt-count" }, loading ? "Cargando…" : (error ? "Error" : `${total} registros`)),
        React.createElement("button", { className: "dt-btn", onClick: handleExport, disabled: loading || !!error || !sorted.length }, "Exportar a Excel")
      )
    ),

    // Estado error
    error && React.createElement("div", { className: "dt-error" }, "⚠️ ", error),

    // Tabla
    React.createElement(
      "div",
      { className: "dt-tablebox" },
      React.createElement(
        "table",
        { className: "dt-table" },
        React.createElement(
          "thead",
          null,
          React.createElement("tr", null, ...cols.map(Th))
        ),
        React.createElement(
          "tbody",
          null,
          loading
            ? React.createElement("tr", null, React.createElement("td", { colSpan: Math.max(1, cols.length), className: "dt-td" }, "Cargando…"))
            : paged.length
              ? paged.map((row, i) =>
                  React.createElement(
                    "tr",
                    { key: i, className: "dt-tr" },
                    ...cols.map((c) => Td(c, row, i))
                  )
                )
              : React.createElement("tr", null, React.createElement("td", { colSpan: Math.max(1, cols.length), className: "dt-td" }, "Sin datos"))
        )
      )
    ),

    // Paginación
    React.createElement(
      "div",
      { className: "dt-pager" },
      React.createElement("button", { className: "dt-btn", onClick: () => setPage(1), disabled: pageClamped <= 1 }, "⏮"),
      React.createElement("button", { className: "dt-btn", onClick: () => setPage(p => Math.max(1, p - 1)), disabled: pageClamped <= 1 }, "◀"),
      React.createElement("span", { className: "dt-pageinfo" }, `Página ${pageClamped} de ${totalPages}`),
      React.createElement("button", { className: "dt-btn", onClick: () => setPage(p => Math.min(totalPages, p + 1)), disabled: pageClamped >= totalPages }, "▶"),
      React.createElement("button", { className: "dt-btn", onClick: () => setPage(totalPages), disabled: pageClamped >= totalPages }, "⏭")
    )
  );
}
