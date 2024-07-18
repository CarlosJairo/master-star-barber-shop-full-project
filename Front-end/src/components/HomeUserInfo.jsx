import { Link } from "react-router-dom";
import { useContext } from "react";
import UserCurrentContext from "../context/UserCurrentContext";
import "../styles/HomeUserInfo.css";
import { UserSVG } from "../assets/IconsSVG";
import BtnEliminarCliente from "./BtnEliminarCliente";

const HomeUserInfo = () => {
  const { userCurrent } = useContext(UserCurrentContext);

  const { nombre, img, telefono, email, fechaNacimiento } = userCurrent;

  return (
    <section className="usuarios-page-section">
      <h2>Detalles de usuario</h2>
      <article className="article-user-page">
        <h3>{nombre}</h3>
        {img ? <img src={img} alt={`Foto de ${nombre}`} /> : <UserSVG />}
        <div className="info-container">
          <p>
            Celular: <span>{telefono}</span>
          </p>
          {/* <p>
            Ciudad: <span>{ciudad}</span>
          </p> */}
          <p>
            Fecha de nacimiento: <span>{fechaNacimiento}</span>
          </p>
          <p>
            Correo electrónico: <span>{email}</span>
          </p>
        </div>
      </article>

      <div className="btns-container">
        <Link
          to="/sing-up-hair-salon"
          className="btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Registrar peluquería
        </Link>
        <BtnEliminarCliente />
      </div>
    </section>
  );
};

export default HomeUserInfo;
