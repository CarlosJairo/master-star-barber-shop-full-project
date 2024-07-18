import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import EndpointContext from "../context/Endpoint";
import "../styles/EmployeeForm.css";
import UserCurrentContext from "../context/UserCurrentContext";
import useGoAnyWhere from "../hooks/useGoAnyWhere";

const SingUpEmploye = () => {
  const [newEmployee, setNewEmployee] = useState();

  const { endpoint } = useContext(EndpointContext);
  const { userCurrent } = useContext(UserCurrentContext);

  const { clienteId } = useParams();
  const { goTo } = useGoAnyWhere();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${endpoint}/clientes/${clienteId}`);
        const json = await response.json();

        setNewEmployee(json.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const handleSingUpEmployee = async (data) => {
    data.clienteId = newEmployee._id;

    try {
      const response = await fetch(
        `${endpoint}/peluquerias/${userCurrent.peluqueriaId}/empleados/registrar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const json = await response.json();
      console.log(json);
      window.alert("Empleado registrado.");
      goTo("/admin");
    } catch (err) {
      window.alert("Error al registrar empleado.");
      console.log(err);
    }
  };

  return (
    <section className="section-empleado-registrar">
      <article className="article-registrar-empleado">
        <h2>Registro para empleados</h2>
        {newEmployee && (
          <p>
            Completa la información de <b>{newEmployee.nombre}</b>
          </p>
        )}
        <h3></h3>
        <EmployeeForm handleSingUpEmployee={handleSingUpEmployee} />
        {/* <Link to="/" className="register-ancle">
        Iniciar Sesión
      </Link> */}
      </article>
    </section>
  );
};

export default SingUpEmploye;
