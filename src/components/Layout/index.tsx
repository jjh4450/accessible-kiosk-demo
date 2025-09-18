import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { layoutContainer } from "./styles.css";

function Layout() {
  return (
    <div className={layoutContainer}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;

