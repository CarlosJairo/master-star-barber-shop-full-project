const HeaderNotification = ({ notif }) => {
  const { title, descripcion } = notif;
  return (
    <div className="notificacion">
      <p className="title">{title}</p>
      <hr />
      <p className="descripcion-noti">{descripcion}</p>
    </div>
  );
};

export default HeaderNotification;
