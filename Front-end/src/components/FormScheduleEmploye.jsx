import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppoimentDetailsContext from "../context/AppoimentDetailsContext";

const FormScheduleEmploye = ({ empleado }) => {
  const [horas, setHoras] = useState(false);

  const { appointment, handleChangeAppointment } = useContext(
    AppoimentDetailsContext,
  );

  const handleChangeDay = (e) => {
    const dia = empleado.horarios.find(
      (horario) => horario._id === e.target.value,
    );
    handleChangeAppointment("fecha", dia);

    setHoras(dia ? dia.horas : []);
  };

  const handleChangeHour = (e) => {
    const horaElegida = horas.find((h) => h.hora == e.target.value);
    handleChangeAppointment("hora", horaElegida);
  };

  return (
    <div className="inputs-horario-container">
      <h3>Horario</h3>
      <label htmlFor="fecha">
        Selecciona el día
        <select name="fecha" id="fecha" onChange={handleChangeDay}>
          <option value="none">Seleccionar</option>
          {empleado &&
            empleado.horarios.map((horario) => (
              <option key={horario._id} value={horario._id}>
                {horario.fecha}
              </option>
            ))}
        </select>
      </label>

      <label htmlFor="hora">
        Selecciona la hora
        <select name="hora" id="hora" onChange={handleChangeHour}>
          <option value="none">Seleccionar</option>
          {horas &&
            horas.map(
              (hora) =>
                hora.libre && (
                  <option key={hora.hora} value={hora.hora}>
                    {hora.hora}
                  </option>
                ),
            )}
        </select>
      </label>

      <Link
        to={`/home/${appointment.peluqueriaId}/${appointment.empleadoId}/generarCita`}
        className="horario-siguiente btn-siguiente"
      >
        Siguiente
      </Link>
    </div>
  );
};

export default FormScheduleEmploye;
