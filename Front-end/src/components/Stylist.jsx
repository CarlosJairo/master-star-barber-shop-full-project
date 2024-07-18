import { useNavigate } from "react-router-dom";
import { HeartSVG, UserSVG } from "../assets/IconsSVG";
import { useContext } from "react";
import AppoimentDetailsContext from "../context/AppoimentDetailsContext";

const Stylist = ({ empleado, idSalon }) => {
  if (!empleado.clienteId) return;

  const { _id, descripcion, especialidad } = empleado;
  const { nombre, img } = empleado.clienteId;

  const { handleChangeAppointment } = useContext(AppoimentDetailsContext);

  let navigate = useNavigate();

  const handleClick = () => {
    handleChangeAppointment("empleado", empleado);
    navigate(`/home/${idSalon}/${_id}/servicios`);
  };

  return (
    <div className="empleado" onClick={handleClick}>
      {img ? <img src={img} alt="Foto perfil peluqueria" /> : <UserSVG />}
      <div className="linea-ver"></div>

      <div className="info-peluqueria">
        <h3>{nombre}</h3>
        <h6>{especialidad}</h6>
        <p>{descripcion}</p>
      </div>
      <div className="calificacion-container">
        <p>★★★★☆</p>
        <p>
          <HeartSVG />
        </p>
      </div>
    </div>
  );
};

export default Stylist;
