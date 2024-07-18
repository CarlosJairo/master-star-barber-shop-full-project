import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EndpointContext from "../context/Endpoint";
import InfoEmployeSchedule from "./InfoEmployeSchedule";
import FormScheduleEmploye from "./FormScheduleEmploye";

const StylistSchedule = () => {
  const [empleado, setEmpleado] = useState(null);
  const { endpoint } = useContext(EndpointContext);
  const { idSalon, idEmpleado } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint}/peluquerias/${idSalon}/empleados/${idEmpleado}`,
        );

        if (!response.ok)
          throw { status: response.status, statusText: response.statusText };

        const data = await response.json();
        setEmpleado(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <section className="section-horario section">
      <h2>Horario disponible</h2>
      <hr />
      <p>Elige el horario disponible del estilista</p>

      <div className="f-b-container horario-container">
        <InfoEmployeSchedule empleado={empleado} />
        <div className="linea-ver"></div>
        <FormScheduleEmploye empleado={empleado} />
      </div>
    </section>
  );
};

export default StylistSchedule;
