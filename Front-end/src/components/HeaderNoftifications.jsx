import { useState } from "react";
import "../styles/Notifications.css";
import HeaderNotification from "./HeaderNotification";

const inicialData = [
  // {
  //   id: 1,
  //   title: "Tu cita se ha aprobado",
  //   descripcion: "Presiona aquí para ver los detalles de la cita",
  // },
];

const HeaderNoftifications = ({ visibleNotifs, setVisibleNotifs }) => {
  const [notificaciones, setNotificaciones] = useState(inicialData);

  return (
    <aside className={`notificaciones ${visibleNotifs ? "active" : ""}`}>
      <div className="titulo-ctn">
        <h2>Notificaciones</h2>
        <p
          className="close alternate-notificaiones"
          onClick={() => setVisibleNotifs(false)}
        >
          X
        </p>
      </div>

      <div className="notificaciones-ctn">
        {notificaciones.length > 0 ? (
          notificaciones.map((notif) => (
            <HeaderNotification key={notif.id} notif={notif} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay notificaciones</p>
        )}
      </div>
    </aside>
  );
};

export default HeaderNoftifications;
