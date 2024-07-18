import { useContext, useEffect, useState } from "react";
import HairSalon from "./HairSalon";
import TitleAndOrder from "./TitleAndOrder";
import { SearchSVG } from "../assets/IconsSVG";
import EndpointContext from "../context/Endpoint";

const inicialData = [];

const HomeSearchHairSalon = () => {
  const [barberias, setBarberias] = useState(inicialData);
  const { endpoint } = useContext(EndpointContext);
  const [stringBuscar, setSetstringBuscar] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${endpoint}/peluquerias`);

        if (!response.ok) {
          throw { status: response.status, statusText: response.statusText };
        }

        const data = await response.json();

        setBarberias(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const filtrarBarberias = (barberias) => {
    return barberias?.filter(
      (barberia) =>
        barberia.nombre.slice(0, stringBuscar.length).toLowerCase() ===
          stringBuscar || stringBuscar === "",
    );
  };

  const barberiasFiltradas = filtrarBarberias(barberias);

  return (
    <section className="section-peluquerias">
      <TitleAndOrder
        title={"Encuentra tu peluquería favorita"}
        order={"Presiona la peluqueria o barbaria que deseas"}
      />

      <article className="f-b-container">
        <div className="filter-container">
          <label className="search-ctn fil">
            <input
              type="text"
              placeholder="Buscar..."
              onChange={(e) => setSetstringBuscar(e.target.value.toLowerCase())}
            />
            <SearchSVG />
          </label>
        </div>

        <div className="barberias">
          {barberiasFiltradas &&
            barberiasFiltradas.map((barber) => (
              <HairSalon key={barber._id} peluqueria={barber} />
            ))}
        </div>
      </article>
    </section>
  );
};

export default HomeSearchHairSalon;
