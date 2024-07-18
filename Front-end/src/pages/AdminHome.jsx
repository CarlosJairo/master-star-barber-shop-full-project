import { Outlet } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import "../styles/Home.css";
import "../styles/AdminHome.css";

const AdminHome = () => {
  return (
    <>
      <HomeHeader ruta={"/admin"} />
      <Outlet />
    </>
  );
};

export default AdminHome;
