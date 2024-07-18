import { Link } from "react-router-dom";

const AdminInicialHome = () => {
  return (
    <section className="inicio admin-home">
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

        <p className="slogan-inicio">
          Rol: <b>Administrador</b>
        </p>
      </article>
      <hr className="linea-inicio" />
      <article className="btn-container btns-container-admin-home">
        <p>Opciones:</p>
        <Link to="/admin/registrar-empleados" className="buscar-peluq">
          Registrar empleados
        </Link>
        <Link to="/admin/reservaciones" className="buscar-peluq">
          Reservaciones
        </Link>
        {/* <Link to="/admin/inventario" className="buscar-peluq">
          Inventario
        </Link>
        <Link to="/admin/informes" className="buscar-peluq">
          Informes
        </Link> */}
        <Link to="/home/buscar-peluqueria" className="buscar-peluq">
          Reservar cita
        </Link>
      </article>
    </section>
  );
};

export default AdminInicialHome;
