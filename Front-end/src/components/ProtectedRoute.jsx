import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserCurrentContext from "../context/UserCurrentContext";

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { userCurrent } = useContext(UserCurrentContext);
  const { roles } = userCurrent;

  const tieneAcceso = rolesPermitidos.includes(roles[0]);

  // Si ninguno de los roles del usuario está permitido, redireccionamos al usuario a la página principal ("/").
  if (!tieneAcceso) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
