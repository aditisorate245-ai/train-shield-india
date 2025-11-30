import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== 'ndma' && userRole !== 'partner') {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
