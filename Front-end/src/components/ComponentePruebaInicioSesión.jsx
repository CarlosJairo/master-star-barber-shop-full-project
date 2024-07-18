import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserCurrentContext from "../context/UserCurrentContext";
import "../styles/ComponentePruebaInicioSesión.css";

const EXPAMPLEUSERS = [
  {
    id: 2,
    name: "empleado",
    roles: ["empleado"],
  },
  { id: 3, name: "administrador", roles: ["administrador"] },
];

const ComponentePruebaInicioSesión = () => {
  const { addUserCurrent } = useContext(UserCurrentContext);

  let navigate = useNavigate();

  const handleClick = (user) => {
    addUserCurrent(user);
    if (user.roles.includes("administrador")) {
      return navigate("/admin");
    } else if (user.roles.includes("empleado")) {
      return navigate("/employee");
    }
  };

  return (
    <section className="componente-prueba-inicio-sesion">
      <p>Iniciar sesión como:</p>
      <div>
        <button onClick={() => handleClick(EXPAMPLEUSERS[0])}>Empleado</button>
        <button onClick={() => handleClick(EXPAMPLEUSERS[1])}>
          Administrador
        </button>
      </div>

      <p>
        <small>
          Este componente es solo de prueba mientras se desarrolla el back-end.
        </small>
      </p>
    </section>
  );
};

export default ComponentePruebaInicioSesión;
