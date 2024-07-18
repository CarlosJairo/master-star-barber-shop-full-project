import { useContext } from "react";
import { Link } from "react-router-dom";
import SingUpInfo from "../components/SingUpInfo";
import SingUpForm from "../components/SingUpForm";
import UserCurrentContext from "../context/UserCurrentContext";
import useGoHome from "../hooks/useGoHome";
import EndpointContext from "../context/Endpoint";
import "../styles/SingUpPage.css";

const SingUpPage = () => {
  const { endpoint } = useContext(EndpointContext);
  const { addUserCurrent } = useContext(UserCurrentContext);
  const { goHome } = useGoHome();

  const handleFormSubmit = async (formData) => {
    try {
      const user = {
        nombre: formData.user,
        email: formData.email,
        password: formData.password,
        telefono: formData.phone,
        fechaNacimiento: formData.birthdate,
        roles: ["cliente"],
      };

      const response = await fetch(`${endpoint}/clientes/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw { status: response.status, statusText: response.statusText };
      }

      const result = await response.json();
      console.log("Registro exitoso", result);

      window.alert("Has sido registrado exitosamente.");
      addUserCurrent(result.data);
      goHome();
    } catch (error) {
      window.alert("Error al registrarse, intenta nuevamente.");
      console.error("Hubo un problema con el registro:", error);
    }
  };

  return (
    <section className="section-registrar">
      <SingUpInfo />
      <article className="article-registrar">
        <h2>Registrarse</h2>
        <SingUpForm handleFormSubmit={handleFormSubmit} />
        <p className="iniciar-sesion-ctn">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/" className="register-ancle">
            Iniciar Sesión
          </Link>
        </p>
      </article>
    </section>
  );
};

export default SingUpPage;
