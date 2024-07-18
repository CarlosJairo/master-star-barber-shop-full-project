import { Link } from "react-router-dom";

const HomeInicial = () => {
  return (
    <section className="inicio">
      <article className="titulo-inicio">
        <h1>
          MASTER STAR
          <br />
          BARBER SHOP
        </h1>
        <p className="slogan-inicio">
          Reservaciones en línea para
          <br />
          peluquerías y barberías
        </p>
      </article>
      <hr className="linea-inicio" />
      <article className="btn-container">
        <p>Presiona para iniciar:</p>
        <Link to="/home/buscar-peluqueria" className="buscar-peluq">
          Buscar Peluquería
        </Link>
      </article>
    </section>
  );
};

export default HomeInicial;
