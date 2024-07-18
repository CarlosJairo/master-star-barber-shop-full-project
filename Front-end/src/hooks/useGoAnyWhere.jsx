import { useNavigate } from "react-router-dom";

const useGoAnyWhere = () => {
  let navigate = useNavigate();

  const goTo = (route) => navigate(route);

  return { goTo };
};

export default useGoAnyWhere;
