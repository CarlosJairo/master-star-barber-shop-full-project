import { createContext, useState } from "react";

const ENDPOINT = "http://localhost:3000/api";

const EndpointContext = createContext();

const EndpointProvider = ({ children }) => {
  const [endpoint, setEndpoint] = useState(ENDPOINT);

  const data = { endpoint };

  return (
    <EndpointContext.Provider value={data}>{children}</EndpointContext.Provider>
  );
};

export { EndpointProvider };
export default EndpointContext;
