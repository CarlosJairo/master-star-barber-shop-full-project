import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import LogInForm from "../components/LogInForm";
import UserCurrentContext from "../context/UserCurrentContext";
import EndpointContext from "../context/Endpoint";
import "../styles/LogInPage.css";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { addUserCurrent } = useContext(UserCurrentContext);
  const { endpoint } = useContext(EndpointContext);

  let navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await fetch(`${endpoint}/clientes/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message };
      }

      const user = json.user;

      addUserCurrent(user);
      if (user.roles.includes("cliente")) {
        return navigate("/home");
      } else if (user.roles.includes("empleado")) {
        return navigate("/employee");
      } else if (user.roles.includes("administrador")) {
        return navigate("/admin");
      }
    } catch (err) {
      window.alert(err.message);
      navigate("/");
    }
  };

  return (
    <section className="section-iniciar-sesion">
      <article className="article-iniciar-sesion">
        <Logo />
        <h2 className="subtitle">Bienvenido</h2>

        <LogInForm
          handleLogin={handleLogin}
          error={error}
          setError={setError}
        />
        <hr className="linea-vertical" />
        <p className="p-login">
          Si no tienes una cuenta debes{" "}
          <Link to="/sing-up" className="reg-ancle">
            Registrarse
          </Link>
        </p>
      </article>
    </section>
  );
};

export default LoginPage;
