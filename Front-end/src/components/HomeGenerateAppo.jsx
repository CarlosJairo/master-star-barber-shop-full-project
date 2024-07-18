import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderSVG } from "../assets/IconsSVG";
import AppoimentDetailsContext from "../context/AppoimentDetailsContext";
import UserCurrentContext from "../context/UserCurrentContext";
import EndpointContext from "../context/Endpoint";
import imgPrueba from "../assets/img/corte.png";

const ServiceInGenerateApp = ({ ser }) => {
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

const HomeGenerateAppo = () => {
  const [infoRequest, setInfoRequest] = useState({
    isLoading: false,
    respuestas: false,
  });
  const { appointment } = useContext(AppoimentDetailsContext);
  const { endpoint } = useContext(EndpointContext);
  const { userCurrent } = useContext(UserCurrentContext);

  const { empleado, peluqueria, servicios, fecha, hora } = appointment;
  const montoTotal = servicios.reduce((acc, currV) => acc + currV.precio, 0);

  let navigate = useNavigate();

  const cita = {
    clienteId: userCurrent._id,
    peluqueriaId: peluqueria._id,
    empleadoId: empleado._id,
    servicios: servicios.map((ser) => ser._id),
    horarioId: fecha._id,
    horaId: hora._id,
    estado: "pendiente",
  };

  console.log(cita);

  const pagar = async () => {
    try {
      setInfoRequest({ ...infoRequest, isLoading: true });

      const date = new Date();

      const response = await fetch(`${endpoint}/citas/generar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita),
      });

      if (!response.ok) {
        throw { status: response.status, statusText: response.statusText };
      }

      const json = await response.json();
      const citaGenerada = json.data;

      const pago = {
        citaId: citaGenerada._id,
        monto: montoTotal,
        horaId: hora._id,
        fecha: date.toLocaleDateString(),
        metodoPago: "tarjeta",
      };

      const payResponse = await fetch(`${endpoint}/citas/pagar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pago),
      });

      if (!payResponse.ok) {
        throw { status: response.status, statusText: response.statusText };
      }

      const payJson = await payResponse.json();

      setInfoRequest({ ...infoRequest, respuestas: payJson.message });

      alert(
        "La cita se ha generado exitosamente, revisa el apartado de citas pendientes para mas información.",
      );
      navigate("/home");
    } catch (err) {
      setInfoRequest({ ...infoRequest, respuestas: err.statusText });
      console.error(err);
    } finally {
      setInfoRequest({ ...infoRequest, isLoading: true });
    }
  };

  return (
    <section className="section-confirmar section">
      <h2>Generar cita</h2>
      <hr />
      <p>Verifíca toda la información y paga tu cita</p>

      <article className="f-b-container informacion-cita">
        <div className="estilista-cnfr">
          <h3>Estilista</h3>
          <img
            src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
            alt="Foto perfil estilista"
          />
          <h4>{empleado.clienteId.nombre}</h4>
          <p>{peluqueria.nombre}</p>
        </div>
        <hr className="linea-ver" />
        <div className="servicios-cnfr">
          <h3>Servicios</h3>
          <div className="servicios">
            {servicios &&
              servicios.map((ser) => (
                <ServiceInGenerateApp key={ser._id} ser={ser} />
              ))}
          </div>
        </div>
        <hr className="linea-ver" />
        <div className="horario-cnfr">
          <h3>Horario</h3>
          <p className="fecha-cnfr">Fecha: {fecha.fecha}</p>
          <p className="hora-cnfr">Hora: {hora.hora}</p>

          <p className="precio">
            Total a pagar: <b>${montoTotal}COP</b>
          </p>

          {infoRequest.respuestas && <p>{infoRequest.respuestas}</p>}

          <div className="pagar-btns-ctn">
            <button className="pagar-btn btn-siguiente" onClick={pagar}>
              {!infoRequest.isLoading && "Pagar"}
              {infoRequest.isLoading && <LoaderSVG />}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default HomeGenerateAppo;
