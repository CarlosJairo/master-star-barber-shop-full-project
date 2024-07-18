import { useEffect, useState } from "react";
import imgPrueba from "../assets/img/corte.png";

const Service = ({ servicio, handleClickService }) => {
  const { nombre, img } = servicio;
  const [isActive, setisActive] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(false);

  useEffect(() => {
    if (isFirstRender) {
      handleClickService(servicio, isActive);
    } else {
      setIsFirstRender(true);
    }
  }, [isActive, servicio._id]);

  const handleClick = () => setisActive(!isActive);

  return (
    <div className="servicio" onClick={handleClick}>
      <div className="img-ctn">
        <div className={`circle ${isActive && "is-active"}`}></div>

        {/* Reemplazar img */}
        <img src={imgPrueba} alt="Servicio" />
      </div>
      <p>{nombre}</p>
    </div>
  );
};

export default Service;
