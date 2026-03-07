import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated,loading } = useContext(AuthContext);
  console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
