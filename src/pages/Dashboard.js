import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./dashboard.css";
import DashboardRoutes from "../components/DashboardRoutes";
import SideBar from "../components/SideBar";
import useWindowSize from "../customHooks/useWindowSize";
// import { useClickOutside } from "../customHooks/useClickOutside";

export default function Dashboard() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isHamburgureOpen, setIsHamburgureOpen] = useState(false);
  const [test, setTest] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 1000) {
      setIsSideBarOpen(false);
      setIsHamburgureOpen(true);
    } else {
      setIsSideBarOpen(true);
      setIsHamburgureOpen(false);
    }
  }, [width]);

  return (
    <>
      <div className="wrapper" id="wrapper">
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          isHamburgureOpen={isHamburgureOpen}
          setTest={setTest}
          test={test}
        />
        <div className="wrapper__content__container">
          <SideBar isSideBarOpen={isSideBarOpen} />
          <DashboardRoutes />
        </div>
      </div>
    </>
  );
}
