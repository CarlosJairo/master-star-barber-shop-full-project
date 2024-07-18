import { useState } from "react";
import { LockSVG, UserSVG } from "../assets/IconsSVG";

const inicialForm = {
  email: "",
  password: "",
};

const LogInForm = ({ handleLogin, error, setError }) => {
  const [form, setForm] = useState(inicialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in form) {
      if (form[key] === "") {
        return setError("Por favor, completa todos los campos.");
      }
    }

    handleLogin(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error-in-login">{error}</p>}

      <label className="text-box">
        <UserSVG />
        <input
          type="text"
          placeholder="Email..."
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <label className="text-box">
        <LockSVG />
        <input
          type="password"
          placeholder="Contraseña..."
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </label>

      <div className="p-container">
        <label htmlFor="recordar-radio" className="recordar-contraseña">
          <input
            type="checkbox"
            name="recordar-contraseña"
            id="recordar-radio"
          />
          Recordar contraseña
        </label>
        <p className="olvide-contraseña">Olvidé contraseña</p>
      </div>

      <input type="submit" value="Iniciar Sesión" className="submit-btn" />
    </form>
  );
};

export default LogInForm;
