import { HamburguerSVG } from "../assets/IconsSVG";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import HeaderNoftifications from "./HeaderNoftifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderOptionsUser from "./HeaderOptionsUser";

const AdminHeader = () => {
  const [visibleNotifs, setVisibleNotifs] = useState(false);
  const [visibleOptionsUser, setVisibleOptionsUser] = useState(false);

  return (
    <header className="header">
      <Link to="/admin" className="link-logo">
        <Logo class={"logo-header"} />
      </Link>
      <HamburguerSVG classElement={"hamburguer"} />
      <HeaderMenu
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

export default AdminHeader;
