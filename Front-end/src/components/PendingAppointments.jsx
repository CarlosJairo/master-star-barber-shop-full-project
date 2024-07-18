import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppoimentStatus from "./AppoimentStatus";
import EndpointContext from "../context/Endpoint";
import UserCurrentContext from "../context/UserCurrentContext";
import PendingAppoServices from "./PendingAppoServices";

const PendingAppointments = () => {
  const [data, setData] = useState(false);

  const { endpoint } = useContext(EndpointContext);
  const { userCurrent } = useContext(UserCurrentContext);

  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint}/clientes/${userCurrent._id}/citas/pendientes`,
        );

        if (!response.ok) {
          throw { status: response.status, statusText: response.statusText };
        }

        const json = await response.json();

        setData(json);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch(`${endpoint}/citas/${data._id}/cancelar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw { status: response.status, message: response.message };
      }

      // location.reload();
      window.alert("La cita se ha cancelado.");
      navigate(userCurrent.ruta);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="section-citas-pendientes section">
      <h2>Citas pendientes</h2>
      <hr />
      <p>Revisa la información de tu próxima cita </p>

      {data ? (
        <article className="f-b-container informacion-cita">
          <PendingAppoServices data={data} />

          <hr className="linea-ver" />

          <div className="estilista-cnfr">
            <div className="">
              <h3>Estilista</h3>
              <img
                src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                alt="Foto perfil estilista"
              />
              <p>{data && data.empleadoId.clienteId.nombre}</p>
            </div>

            <div className="">
              <h3 className="horario">Horario</h3>
              <p className="hora-citas-pendientes">
                Hora: {data && data.horaId.hora}
              </p>
              <p className="fecha-citas-pendientes">
                Fecha: {data && data.horarioId.fecha}
              </p>
            </div>
          </div>

          <hr className="linea-ver" />

          <div className="horario-cnfr">
            <h3>Estado</h3>
            <AppoimentStatus />

            <small>Si cancelas, no se hará reembolso de tu dinero.</small>

            <button
              className="generar-cita-btn btn-siguiente"
              onClick={handleClick}
            >
              Cancelar cita
              <img
                src="assests/svg/three-dots.svg"
                alt="Cargando..."
                className="none svg-cargando"
              />
            </button>
          </div>
        </article>
      ) : (
        <h3>No tienes citas pendientes</h3>
      )}
    </section>
  );
};

export default PendingAppointments;
