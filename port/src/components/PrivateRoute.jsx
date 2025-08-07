import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // 👈 Wait for auth check

  return user ? children : <Navigate to="/signup" replace />;
};

export default PrivateRoute;
