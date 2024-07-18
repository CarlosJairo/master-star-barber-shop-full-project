import { useNavigate } from "react-router-dom";
import { HeartSVG, HomeSvg } from "../assets/IconsSVG";
import { useContext } from "react";
import AppoimentDetailsContext from "../context/AppoimentDetailsContext";

const HairSalon = ({ peluqueria }) => {
  const { handleChangeAppointment } = useContext(AppoimentDetailsContext);

  let navigate = useNavigate();

  const handleClick = () => {
    handleChangeAppointment("peluqueria", peluqueria);
    navigate(`/home/${_id}`);
  };

  const {
    _id,
    fotoPerfil,
    nombre,
    direccion,
    horarioSemana,
    horarioFinSemana,
  } = peluqueria;

  return (
    <div className="barberia" onClick={handleClick}>
      {fotoPerfil === "" ? (
        <HomeSvg />
      ) : (
        <img src={fotoPerfil} alt="Foto perfil peluqueria" />
      )}
      <div className="linea-ver"></div>

      <div className="info-peluqueria">
        <h3>{nombre}</h3>
        <p className="direccion">{direccion}</p>
        <p className="horario">
          Horario: {horarioSemana};
          <br />
          Horario en sabado: {horarioFinSemana};
        </p>
        <p className="stairs-movil">★★★★☆</p>
      </div>
      <div className="calificacion-container">
        <p className="stairs-pc">★★★★☆</p>
        <p>
          <HeartSVG classElement={"favoritos"} />
        </p>
      </div>
    </div>
  );
};

export default HairSalon;
