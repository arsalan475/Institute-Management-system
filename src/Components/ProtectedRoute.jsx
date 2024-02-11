import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
  return user ? children : <Navigate to="/login"></Navigate>;
}

export default ProtectedRoute;
