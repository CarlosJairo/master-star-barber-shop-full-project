import { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import InputSearch from "./InputSearch";
import TitleAndOrder from "./TitleAndOrder";
import User from "./User";
import ModalSingUpEmployed from "./ModalSingUpEmployed";
import EndpointContext from "../context/Endpoint";

const AdminSingUpEmpl = () => {
  const [users, setUsers] = useState(null);
  const [userTosearch, setUserTosearch] = useState(null);
  const [inputData, setInputData] = useState("");

  const [isOpen, closeModal, openModal] = useModal();
  const { endpoint } = useContext(EndpointContext);

  const handleFilter = (users) => {
    return users?.filter(
      (user) =>
        (user.nombre.toLowerCase().slice(0, inputData.length) === inputData ||
          inputData === "") &&
        user.roles.includes("cliente"),
    );
  };

  const filterUsers = handleFilter(users);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${endpoint}/clientes`);
        const json = await res.json();
        setUsers(json);
      } catch (err) {
        console.log(err);
        window.alert("Error al obtener usuarios");
      }
    };
    getData();
  }, []);

  return (
    <section className="section section-registrar-empleado">
      <TitleAndOrder
        title={"Registrar empleado"}
        order={"Busca el nombre del nuevo empleado"}
      />

      <article className="f-b-container">
        <InputSearch inputData={inputData} setInputData={setInputData} />

        <div className="barberias">
          {filterUsers ? (
            filterUsers.map((user) => (
              <User
                key={user._id}
                user={user}
                openModal={openModal}
                setUserTosearch={setUserTosearch}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              Busca el nombre de tu nuevo empleado
            </p>
          )}
        </div>
      </article>

      {userTosearch && (
        <ModalSingUpEmployed
          isOpen={isOpen}
          closeModal={closeModal}
          userTosearch={userTosearch}
        />
      )}
    </section>
  );
};

export default AdminSingUpEmpl;
