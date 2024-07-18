import { createContext, useState } from "react";

const inicialData = {
  clienteId: "",
  empleado: {},
  peluqueria: {},
  servicios: [],
  fecha: {},
  hora: {},
  estado: "pendiente",
};

const AppoimentDetailsContext = createContext();

const AppoimentDetailsProvider = ({ children }) => {
  const [appointment, setAppointment] = useState(inicialData);

  const handleChangeAppointment = (llave, valor) => {
    setAppointment({ ...appointment, [llave]: valor });
  };

  const data = { appointment, handleChangeAppointment };

  return (
    <AppoimentDetailsContext.Provider value={data}>
      {children}
    </AppoimentDetailsContext.Provider>
  );
};

export { AppoimentDetailsProvider };
export default AppoimentDetailsContext;
