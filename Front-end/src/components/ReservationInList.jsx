import { UserSVG } from "../assets/IconsSVG";

const ReservationInList = ({ reservacion }) => {
  const { clienteId, servicios, estado } = reservacion;

  return (
    <div className="barberia">
      <UserSVG />
      <div className="linea-ver"></div>

      <div className="info-peluqueria">
        <h3>{clienteId.nombre}</h3>
        <p className="horario">{clienteId.fechaNacimiento}</p>
        <div className="servicios">
          {servicios &&
            servicios.map((servicio) => (
              <p
                key={servicio.id}
                style={{ fontSize: "0.8rem", display: "inline" }}
              >
                {servicio.nombre + " | "}
              </p>
            ))}
        </div>
      </div>

      <div className="">
        <h4 style={{ textTransform: "capitalize" }}>{estado}</h4>
      </div>
    </div>
  );
};

export default ReservationInList;
