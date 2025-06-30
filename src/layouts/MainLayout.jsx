import React from "react";
import { Outlet } from "react-router";
import Header from "../pages/shared/Header";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
