import { Outlet } from "react-router-dom";
import TopBar from "../Header/TopBar";
import CustomNavbar from "../Header/CustomNavbar";
import Footer from "../Footer/Footer";

function MainLayout() {
  return (
    <>
      <TopBar />
      <CustomNavbar />
      <Outlet />
      <Footer/>
    </>
  );
}

export default MainLayout;