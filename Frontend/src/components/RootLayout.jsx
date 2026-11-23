import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  const location = useLocation();
  console.log(location);

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (location.pathname.startsWith("/resetPassword")) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location.pathname]);

  return (
    <>
      {show && <NavigationBar />}
      <ToastContainer limit={1} />
      <Outlet />
    </>
  );
};

export default RootLayout;
