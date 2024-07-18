import { Link } from "react-router-dom";
import "../styles/Modal.css";

const ModalSingUpEmployed = ({ isOpen, closeModal, userTosearch }) => {
  // Detener propagacion de modal
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        <p>
          ¿Deseas registrar a <b>{userTosearch.nombre}</b> como tu nuevo
          empleado?
        </p>
        <Link
          className={`btn-registrar-empleado`}
          to={`/admin/formulario-registrar-empleado/${userTosearch._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          Registrar empleado
        </Link>
      </div>
    </article>
  );
};

export default ModalSingUpEmployed;
