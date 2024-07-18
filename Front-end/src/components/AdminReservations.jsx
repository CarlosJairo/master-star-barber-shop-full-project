import { useContext, useEffect, useState } from "react";
import TitleAndOrder from "./TitleAndOrder";
import ReservationInList from "./ReservationInList";
import EndpointContext from "../context/Endpoint";
import UserCurrentContext from "../context/UserCurrentContext";
import FilterAppoOnAdmin from "./FilterAppoOnAdmin";

const AdminReservations = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [categorias, setCategorias] = useState("todas");
  const { endpoint } = useContext(EndpointContext);
  const { userCurrent } = useContext(UserCurrentContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `${endpoint}/peluquerias/${userCurrent.peluqueriaId}/reservaciones`,
        );
        const json = await res.json();
        setReservaciones(json);
      } catch (err) {
        window.alert("Error al obtener usuarios");
      }
    };
    getData();
  }, []);

  const filtarReservaciones = (reservaciones) => {
    return reservaciones?.filter(
      (reservacion) =>
        reservacion.estado === categorias || categorias === "todas",
    );
  };

  const reservacionesFiltradas = filtarReservaciones(reservaciones);

  return (
    <section className="section section-registrar-empleado">
      <TitleAndOrder
        title={"Reservaciones"}
        order={"Puedes aprobar o cancelar las reservaciones de tus clientes"}
      />

      <article className="f-b-container">
        <div className="barberias">
          <FilterAppoOnAdmin
            categorias={categorias}
            setCategorias={setCategorias}
          />
          {reservacionesFiltradas.length > 0 ? (
            reservacionesFiltradas.map((reservacion) => (
              <ReservationInList
                key={reservacion._id}
                reservacion={reservacion}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              No tienes reservaciones disponibles.
            </p>
          )}
        </div>
      </article>
    </section>
  );
};

export default AdminReservations;
