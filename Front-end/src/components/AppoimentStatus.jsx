const AppoimentStatus = () => {
  return (
    <div className="estado-ctn">
      <div className="rectangulos up" style={{ position: "relative" }}>
        <div className="circulo-pendiente"></div>
      </div>
      <div className="rectangulos up" style={{ position: "relative" }}></div>
      <div className="rectangulos up no-borde"></div>
      <div className="rectangulos down">
        <p>Pendiente</p>
      </div>
      <div className="rectangulos down">
        <p>Realizada</p>
      </div>
      <div className="rectangulos down no-borde">
        <p>Cancelada</p>
      </div>
    </div>
  );
};

export default AppoimentStatus;
