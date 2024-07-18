const InfoEmployeSchedule = ({ empleado }) => {
  return (
    <div className="empleado-horario">
      <img
        src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
        alt="Foto perfil estilísta"
      />
      <div className="empleado-horario">
        <h3>{empleado && empleado.clienteId.nombre}</h3>
        <p>{empleado && empleado.descripcion}</p>
      </div>
    </div>
  );
};

export default InfoEmployeSchedule;
