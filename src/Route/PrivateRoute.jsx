import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loader } = useAuth;
  const location = useLocation();
  if (loader) {
    return <progress className="progress w-56"></progress>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
