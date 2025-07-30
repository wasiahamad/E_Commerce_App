import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // Agar token nahi hai, login page pe redirect karo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, component render hone do
  return children;
};

export default PrivateRoute;
