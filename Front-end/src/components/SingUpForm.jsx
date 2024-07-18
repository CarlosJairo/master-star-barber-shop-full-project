import { useState } from "react";

const inicialForm = {
  user: "",
  phone: "",
  email: "",
  password: "",
  birthdate: "",
  terminosYCondiciones: false,
};

const SingUpForm = ({ handleFormSubmit }) => {
  const [form, setForm] = useState(inicialForm);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key in form) {
      if (form[key] === "" || form[key] === false) {
        window.alert("Por favor, llena correctamente los datos.");
        return;
      }
    }

    handleFormSubmit(form);
  };

  return (
    <form className="formulario-registro" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="user"
        placeholder="Nombre de usuario"
        value={form.user}
        onChange={handleChange}
      />
      <input
        className="input"
        type="phone"
        name="phone"
        placeholder="Celular"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="email"
        placeholder="Correo electronico"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="input"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
      />
      <label htmlFor="birthdate" className="label-birthdate">
        Fecha de nacimiento
        <input
          className="input"
          type="date"
          name="birthdate"
          id="birthdate"
          value={form.birthdate}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="terminosYCondiciones" className="tc-label">
        <input
          id="terminosYCondiciones"
          type="checkbox"
          className="chexbox terminos-condiciones"
          name="terminosYCondiciones"
          checked={form.terminosYCondiciones}
          onChange={handleChecked}
        />
        Aceptar <span className="span-register"> Terminos y Condiciones</span>
      </label>
      {error && <p>{error}</p>}
      <input type="submit" value="Registrarse" className="register-btn" />
    </form>
  );
};

export default SingUpForm;
