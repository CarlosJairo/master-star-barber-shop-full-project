import { Link } from "react-router-dom";
import "../styles/HeaderOptionsUser.css";
import useGoAnyWhere from "../hooks/useGoAnyWhere.jsx";
import { useContext } from "react";
import UserCurrentContext from "../context/UserCurrentContext";

const HeaderOptionsUser = ({ visibleOptionsUser }) => {
  const { removeUserCurrent } = useContext(UserCurrentContext);
  const { goTo } = useGoAnyWhere("/");

  const handleClick = () => {
    removeUserCurrent();
    goTo("/");
  };

  return (
    <div className={`options-user ${visibleOptionsUser ? "is-active" : ""}`}>
      <Link to="/home/user">Mi usuario</Link>
      <hr />
      <Link to="/home/settings">Opciones</Link>
      <Link to="/home/settings">Condiciones de uso</Link>
      <hr />
      <Link onClick={handleClick}>Cerrar sesión</Link>
      {/* <button>Cerrar sesión</button> */}
    </div>
  );
};

export default HeaderOptionsUser;
