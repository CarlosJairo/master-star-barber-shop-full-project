import { useContext, useState } from "react";
import UserCurrentContext from "../context/UserCurrentContext";
import EndpointContext from "../context/Endpoint";
import useGoAnyWhere from "../hooks/useGoAnyWhere";

const inicialForm = {
  nombre: "",
  ciudad: "",
  direccion: "",
  horarioSemana: "",
  horarioFinSemana: "",
  fotoPerfil: "",
};

const HairSalonForm = () => {
  const [form, setForm] = useState(inicialForm);
  const { userCurrent } = useContext(UserCurrentContext);
  const { endpoint } = useContext(EndpointContext);
  const { goTo } = useGoAnyWhere();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.clienteId = userCurrent._id;

    fetch(`${endpoint}/peluquerias/registrar/${userCurrent._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        window.alert(
          "Peluquería registrada, ahora eres administrador, tienes que volver a iniciar sesión para desbloquear tus nuevas funcionalidades.",
        );
        goTo("/admin");
      })
      .catch((err) => {
        console.log(err);
        window.alert("No se ha podido registrar tu peluquería.");
      });
  };

  return (
    <form className="formulario-registro" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="nombre"
        placeholder="Nombre del establecimiento"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={form.ciudad}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="direccion"
        placeholder="Direccion"
        value={form.direccion}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="horarioSemana"
        placeholder="Horario en dias de semana"
        value={form.horarioSemana}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="horarioFinSemana"
        placeholder="Horario en fines de semana"
        value={form.horarioFinSemana}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="fotoPerfil"
        placeholder="Url foto de perfil"
        value={form.fotoPerfil}
        onChange={handleChange}
      />

      <input type="submit" value="Registrar" className="register-btn" />
    </form>
  );
};

export default HairSalonForm;
