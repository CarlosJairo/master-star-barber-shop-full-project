import { useContext, useEffect, useState } from "react";
import FilterContainer from "./FilterContainer";
import TitleAndOrder from "./TitleAndOrder";
import Stylist from "./Stylist";
import { Outlet, useParams } from "react-router-dom";
import EndpointContext from "../context/Endpoint";

const HomeSearchStylist = () => {
  const [empleados, setEmpleados] = useState(null);
  const { endpoint } = useContext(EndpointContext);
  const { idSalon, idEmpleado } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint}/peluquerias/${idSalon}/empleados`,
        );

        if (!response.ok) {
          throw { status: response.status, statusText: response.statusText };
        }

        const data = await response.json();

        setEmpleados(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      {!idEmpleado && (
        <section className="section-peluquerias">
          <TitleAndOrder
            title={"Elegir estilísta "}
            span={"Bogotá"}
            order={`Presiona al estilista de la barbería que deseas que te atienda`}
          />

          <article className="f-b-container">
            <FilterContainer />

            <div className="empleados">
              {empleados &&
                empleados.map((empleado) => (
                  <Stylist
                    key={empleado._id}
                    empleado={empleado}
                    idSalon={idSalon}
                  />
                ))}
            </div>
          </article>
        </section>
      )}

      <Outlet />
    </>
  );
};

export default HomeSearchStylist;
