import imgPrueba from "../assets/img/corte.png";

const ServiceInPendingApp = ({ ser }) => {
  return (
    <div className="servicio">
      <div className="img-ctn">
        <div className="circle"></div>
        <img src={imgPrueba} alt="Servicio" />
      </div>
      <p>{ser.nombre}</p>
    </div>
  );
};

const PendingAppoServices = ({ data }) => {
  return (
    <div className="servicios-cnfr">
      <h3>Servicios</h3>

      <div className="servicios-cnfr-ctn">
        {data &&
          data.servicios.map((ser) => (
            <ServiceInPendingApp key={ser._id} ser={ser} />
          ))}
      </div>
    </div>
  );
};

export default PendingAppoServices;
