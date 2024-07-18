import { Link } from "react-router-dom";
import { UserSVG } from "../assets/IconsSVG";
import { useContext } from "react";
import UserCurrentContext from "../context/UserCurrentContext";

const HeaderMenu = ({
  visibleMenu,
  setVisibleMenu,
  visibleNotifs,
  setVisibleNotifs,
  visibleOptionsUser,
  setVisibleOptionsUser,
}) => {
  const { userCurrent } = useContext(UserCurrentContext);

  return (
    <nav className={`menu ${visibleMenu ? "is-active" : null}`}>
      <Link to={userCurrent.ruta}>Inicio</Link>

      <Link to="/home/citas-pendientes" className="citas-endientes-btn">
        Citas pendientes
      </Link>
      <button
        className="alternate-notificaiones"
        onClick={() => setVisibleNotifs(!visibleNotifs)}
      >
        Notificaciones
      </button>
      <button
        className="user-info"
        onClick={() => setVisibleOptionsUser(!visibleOptionsUser)}
      >
        <UserSVG classElement={"logo-user"} />
      </button>
    </nav>
  );
};

export default HeaderMenu;
