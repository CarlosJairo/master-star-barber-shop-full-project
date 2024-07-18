import { Outlet } from "react-router-dom";
import HomeHeader from "./HomeHeader";

const EmployeHome = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  );
};

export default EmployeHome;
