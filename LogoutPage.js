import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = ({ setUser }) => {
  useEffect(() => {
    setUser(null); // Clear user session
  }, []);

  return <Navigate to="/" />;
};

export default LogoutPage;
