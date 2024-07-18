import { useContext, useEffect, useState } from "react";
import TitleAndOrder from "./TitleAndOrder";
import FilterContainer from "./FilterContainer";
import ReservationListForEmploye from "./ReservationListForEmploye";
import "../styles/HomeEmploye.css";
import EndpointContext from "../context/Endpoint";

const EmployeeReservations = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const { endpoint } = useContext(EndpointContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `${endpoint}/peluquerias/empleados/6662393e39834b38eb7d8e30/reservaciones`,
        );
        const json = await res.json();
        setReservaciones(json);
      } catch (err) {
        window.alert("Error al obtener usuarios");
      }
    };
    getData();
  }, [actualizar]);

  const handleFilter = (reservaciones) => {
    return reservaciones?.filter(
      (reservacion) => reservacion.estado === "pendiente",
    );
  };

  const filterUsers = handleFilter(reservaciones);

  return (
    <section className="section ">
      <TitleAndOrder
        title={"Reservaciones"}
        order={
          "Puedes ver las reservaciones pendientes de tus clientes, presiona el botón despues de realizarla"
        }
      />

      <article className="f-b-container">
        <FilterContainer />

        <div className="barberias">
          {filterUsers.length !== 0 ? (
            filterUsers.map((reservacion) => (
              <ReservationListForEmploye
                key={reservacion._id}
                reservacion={reservacion}
                setActualizar={setActualizar}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No tienes reservaciones.</p>
          )}
        </div>
      </article>
    </section>
  );
};

export default EmployeeReservations;
