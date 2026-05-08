import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  role?: string;
};

export default function ProtectedRoute({
  children,
  role,
}: Props) {

  const { user } = useAuth();

  // ===================================
  // NO USER
  // ===================================

  if (!user) {
    return <Navigate to="/" />;
  }

  // ===================================
  // ROLE VALIDATION
  // ===================================

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // ===================================
  // OK
  // ===================================

  return children;
}