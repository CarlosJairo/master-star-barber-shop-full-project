import { HamburguerSVG } from "../assets/IconsSVG";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import HeaderNoftifications from "./HeaderNoftifications";
import HeaderOptionsUser from "./HeaderOptionsUser";
import UserCurrentContext from "../context/UserCurrentContext";
import "../styles/HomeHeader.css";
import useVisible from "../hooks/useVisible";

const HomeHeader = () => {
  const [visibleNotifs, setVisibleNotifs] = useVisible();
  const [visibleOptionsUser, setVisibleOptionsUser] = useVisible();
  const [visibleMenu, setVisibleMenu] = useVisible();

  const { userCurrent } = useContext(UserCurrentContext);

  return (
    <header className="header">
      <Link to={userCurrent.ruta} className="link-logo">
        <Logo class={"logo-header"} />
      </Link>
      <button onClick={() => setVisibleMenu(!visibleMenu)}>
        <HamburguerSVG classElement={"hamburguer"} />
      </button>
      <HeaderMenu
        visibleMenu={visibleMenu}
        setVisibleMenu={setVisibleMenu}
        visibleNotifs={visibleNotifs}
        setVisibleNotifs={setVisibleNotifs}
        setVisibleOptionsUser={setVisibleOptionsUser}
        visibleOptionsUser={visibleOptionsUser}
      />
      <HeaderNoftifications
        visibleNotifs={visibleNotifs}
        setVisibleNotifs={setVisibleNotifs}
      />
      <HeaderOptionsUser visibleOptionsUser={visibleOptionsUser} />
    </header>
  );
};

export default HomeHeader;
