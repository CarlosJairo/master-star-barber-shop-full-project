import { useState } from "react";

const inicialForm = {
  especialidad: "",
  descripcion: "",
  fechaIngreso: new Date().toLocaleDateString(),
  certificaciones: "",
  numIdentificacion: "",
  contactoEmergencia: "",
  salarioBase: "",
  servicios: [
    "664929b5306e0a516c3de33c",
    "66492a26306e0a516c3de33d",
    "66492a44306e0a516c3de33e",
    "66492a71306e0a516c3de33f",
  ],
};

const EmployeeForm = ({ handleSingUpEmployee }) => {
  const [form, setForm] = useState(inicialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in form) {
      if (form[key] === "") {
        window.alert("Por favor, llena correctamente los datos.");
        return;
      }
    }

    handleSingUpEmployee(form);
  };

  return (
    <form className="formulario-registro" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="especialidad"
        placeholder="Especialidad"
        value={form.especialidad}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="descripcion"
        placeholder="Descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="certificaciones"
        placeholder="Certificaciones"
        value={form.certificaciones}
        onChange={handleChange}
      />
      <input
        className="input"
        type="number"
        name="numIdentificacion"
        placeholder="Numero de identificación"
        value={form.numIdentificacion}
        onChange={handleChange}
      />
      <input
        className="input"
        type="number"
        name="contactoEmergencia"
        placeholder="Contacto de emergencia"
        value={form.contactoEmergencia}
        onChange={handleChange}
      />

      <input
        className="input"
        type="number"
        name="salarioBase"
        placeholder="Salario base"
        value={form.salarioBase}
        onChange={handleChange}
      />
      {/* <input type="file" id="fileUpload" name="fileUpload" /> */}

      <input type="submit" value="Registrar" className="register-btn" />
    </form>
  );
};

export default EmployeeForm;
