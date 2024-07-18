import HairSalonForm from "../components/HairSalonForm";
import "../styles/SingUpPage.css";

const SingUpHairSalon = () => {
  return (
    <section className="section-registrar">
      <article className="article-registrar">
        <h2>Registrar Establecimiento</h2>
        <HairSalonForm />
        {/* <Link to="/" className="register-ancle">
          Iniciar Sesión
        </Link> */}
      </article>
    </section>
  );
};

export default SingUpHairSalon;
