import { Link, useParams } from "react-router-dom";
import Service from "./Service";
import { useContext, useEffect, useState } from "react";
import EndpointContext from "../context/Endpoint";
import AppoimentDetailsContext from "../context/AppoimentDetailsContext";

const HomeServices = () => {
  const [servicios, setServicios] = useState(null);
  const [serviciosElegidos, setServiciosElegidos] = useState([]);

  const { idSalon, idEmpleado } = useParams();
  const { endpoint } = useContext(EndpointContext);

  const { handleChangeAppointment } = useContext(AppoimentDetailsContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint}/peluquerias/${idSalon}/empleados/${idEmpleado}/servicios`,
        );

        if (!response.ok)
          throw { status: response.status, statusText: response.statusText };

        const data = await response.json();
        setServicios(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    handleChangeAppointment("servicios", serviciosElegidos);
  }, [serviciosElegidos]);

  const handleClickService = (servicio, seleccionado) => {
    setServiciosElegidos(
      seleccionado
        ? [...serviciosElegidos, servicio]
        : serviciosElegidos.filter((ser) => ser !== servicio),
    );
  };

  return (
    <section className="section-servicios section">
      <h2>Selección de servicios</h2>
      <hr />
      <p>Selecciona los servicios que deseés </p>

      <article className="f-b-container servicios-container">
        <div className="servicios-clasicos">
          {servicios &&
            servicios.map((servicio) => (
              <Service
                key={servicio._id}
                servicio={servicio}
                handleClickService={handleClickService}
              />
            ))}
        </div>

        <Link
          to={`/home/${idSalon}/${idEmpleado}/horario`}
          className={`servicio-siguiente btn-siguiente ${
            serviciosElegidos.length === 0 && "disabled"
          }`}
        >
          Siguiente
        </Link>
      </article>
    </section>
  );
};

export default HomeServices;
