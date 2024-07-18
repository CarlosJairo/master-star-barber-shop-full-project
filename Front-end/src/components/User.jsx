import { UserSVG } from "../assets/IconsSVG";

const User = ({ user, openModal, setUserTosearch }) => {
  const { nombre, img, fechaNacimiento, email, telefono } = user;

  const handleOpenModal = () => {
    setUserTosearch(user);
    openModal();
  };

  return (
    <div className="barberia" onClick={handleOpenModal}>
      {/* <img src={img} alt="Foto perfil peluqueria" /> */}
      <UserSVG />
      <div className="linea-ver"></div>

      <div className="info-peluqueria">
        <h3>{nombre}</h3>
        {/* <p className="direccion">{ciudad}</p> */}
        <p className="horario">{telefono}</p>
        <p className="horario">{fechaNacimiento}</p>
        <p className="horario">{email}</p>
      </div>
    </div>
  );
};

export default User;
