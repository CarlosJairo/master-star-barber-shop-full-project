import { useContext } from "react";
import { UserSVG } from "../assets/IconsSVG";
import EndpointContext from "../context/Endpoint";
import useGoAnyWhere from "../hooks/useGoAnyWhere";

const ReservationListForEmploye = ({ reservacion, setActualizar }) => {
  const { clienteId, servicios } = reservacion;
  const { endpoint } = useContext(EndpointContext);
  const { goTo } = useGoAnyWhere();

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${endpoint}/citas/${reservacion._id}/realizar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: undefined,
        },
      );

      const json = await response.json();

      window.alert("Cita realizada con exito");
      setActualizar(true);
    } catch (err) {
      console.error(err);
      window.alert("Error al marcar como realizada la cita.");
    }
  };

  return (
    <div className="barberia reservacion-para-empleado">
      <UserSVG />

      <div className="linea-ver"></div>

      <div className="info-peluqueria">
        <h3>{clienteId.nombre}</h3>
        <p className="horario">{clienteId.fecha_nacimiento}</p>
        <div className="servicios">
          {servicios &&
            servicios.map((servicio) => (
              <p
                key={servicio._id}
                style={{ fontSize: "0.8rem", display: "inline" }}
              >
                {servicio.nombre + " | "}
              </p>
            ))}
        </div>
      </div>

      <div className="">
        <button onClick={handleClick}>Realizada</button>
      </div>
    </div>
  );
};

export default ReservationListForEmploye;
