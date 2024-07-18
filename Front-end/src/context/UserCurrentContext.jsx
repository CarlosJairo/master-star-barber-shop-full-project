/*
Este código define un contexto en React llamado UserCurrentContext.
*/

import { createContext, useEffect, useState } from "react";

const inicialData = {
  roles: [],
};

const UserCurrentContext = createContext();

const UserCurrentProvider = ({ children }) => {
  const [userCurrent, setuserCurrent] = useState(inicialData);

  useEffect(() => {
    if (!userCurrent) return;

    let ruta = "/home";

    if (userCurrent.roles.includes("administrador")) {
      ruta = "/admin";
    } else if (userCurrent.roles.includes("empleado")) {
      ruta = "/employee";
    }

    if (userCurrent.ruta !== ruta) {
      setuserCurrent((prevUserCurrent) => ({
        ...prevUserCurrent,
        ruta,
      }));
    }
  }, [userCurrent.roles]);

  const addUserCurrent = (user) => setuserCurrent(user);
  const removeUserCurrent = () => setuserCurrent(inicialData);

  const data = { userCurrent, addUserCurrent, removeUserCurrent };

  return (
    <UserCurrentContext.Provider value={data}>
      {children}
    </UserCurrentContext.Provider>
  );
};

export { UserCurrentProvider };
export default UserCurrentContext;
