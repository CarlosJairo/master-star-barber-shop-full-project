import { Outlet } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  );
};

export default Home;
