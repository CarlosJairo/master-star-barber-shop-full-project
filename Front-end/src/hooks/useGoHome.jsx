import { useNavigate } from "react-router-dom";

const useGoHome = () => {
  let navigate = useNavigate();

  const goHome = () => navigate("/home");

  return { goHome };
};

export default useGoHome;
