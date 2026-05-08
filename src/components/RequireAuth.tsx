import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <Navigate to="/" />;

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}