import React from "react";

function IconUser(props) {
  return React.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "currentColor", ...props },
    React.createElement("path", { d: "M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.2 0-8 2.1-8 5v1h16v-1c0-2.9-3.8-5-8-5z" })
  );
}
function IconLock(props) {
  return React.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "currentColor", ...props },
    React.createElement("path", { d: "M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-6 0V7a3 3 0 0 1 6 0v2Zm3 6a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 14 15Z" })
  );
}

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    // TODO: reemplazar por tu lógica real de autenticación:
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return React.createElement(
    "div",
    { className: "login-shell" },
    React.createElement(
      "div",
      { className: "login-card" },

      // Columna izquierda (bienvenida)
      React.createElement(
        "section",
        { className: "login-left" },
        React.createElement("h1", null, "HabiCompras"),
        React.createElement(
          "p",
          null,
          "Habib Droguerías presenta su plataforma web integral para el área de compras y logística, diseñada para centralizar, optimizar y agilizar todos los procesos de abastecimiento."+
          "Con una interfaz intuitiva y herramientas inteligentes, podrás: ",
          React.createElement("br"),
          React.createElement("br"),
          "- Gestionar pedidos y proveedores en tiempo real. ",
          React.createElement("br"),
          "- Controlar inventarios con datos siempre actualizados. ",
          React.createElement("br"),
          "- Planificar compras estratégicas basadas en rotación y demanda."
        )
      ),

      // Columna derecha (formulario)
      React.createElement(
        "section",
        { className: "login-right" },
        React.createElement("div", { className: "login-title" }, "USER LOGIN"),

        // Form
        React.createElement(
          "form",
          { onSubmit: handleSubmit, noValidate: true },

          // Email
          React.createElement(
            "div",
            { className: "login-field" },
            React.createElement("label", { className: "login-label", htmlFor: "email" }, "Email"),
            React.createElement(
              "div",
              { className: "login-input-wrap" },
              React.createElement(IconUser, { className: "login-icon" }),
              React.createElement("input", {
                className: "login-input",
                id: "email",
                name: "email",
                type: "email",
                placeholder: "you@example.com",
                required: true,
                autoComplete: "email"
              })
            )
          ),

          // Password
          React.createElement(
            "div",
            { className: "login-field" },
            React.createElement("label", { className: "login-label", htmlFor: "password" }, "Password"),
            React.createElement(
              "div",
              { className: "login-input-wrap" },
              React.createElement(IconLock, { className: "login-icon" }),
              React.createElement("input", {
                className: "login-input",
                id: "password",
                name: "password",
                type: "password",
                placeholder: "••••••••",
                required: true,
                autoComplete: "current-password",
                minLength: 4
              })
            )
          ),

          // Acciones
          React.createElement(
            "div",
            { className: "login-actions" },
            React.createElement(
              "label",
              { className: "login-remember" },
              React.createElement("input", { type: "checkbox", name: "remember" }),
              "Remember"
            ),
            React.createElement("a", { className: "login-link", href: "#" }, "Forgot password?")
          ),

          // Botón
          React.createElement("button", { className: "login-btn", type: "submit" }, "LOGIN")
        ),

      )
    )
  );
}
