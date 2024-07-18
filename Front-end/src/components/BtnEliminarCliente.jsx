import { useContext } from "react";
import EndpointContext from "../context/Endpoint";
import UserCurrentContext from "../context/UserCurrentContext";

const BtnEliminarCliente = () => {
  const { endpoint } = useContext(EndpointContext);
  const { userCurrent } = useContext(UserCurrentContext);

  const handleClick = () => {
    fetch(`${endpoint}/clientes/eliminar/${userCurrent._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        window.alert("Tu cuenta ha sido eliminada");
        location.reload();
      })
      .catch((err) => window.alert("Error al eliminar la cuenta."));
  };

  return (
    <button className="btn eliminar-cuenta-btn" onClick={handleClick}>
      Eliminar cuenta
    </button>
  );
};

export default BtnEliminarCliente;
