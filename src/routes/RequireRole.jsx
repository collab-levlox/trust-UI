import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function RequireRole({ role = [], children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  console.log(user,'user dee');
  
  if (!user) {
    return <Navigate to="/loginpage" state={{ from: location }} replace />;
  }

  // If user has no roles OR does NOT match required role(s) → unauthorized
  if (!user.roles || !role.includes(String(user.roles).toUpperCase())) {
    navigate("/unauthorised");
    return null;
  }

  // Otherwise → allow access
  return children;
}
