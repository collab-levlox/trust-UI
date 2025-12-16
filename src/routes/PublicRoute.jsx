import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const allowPublicLoginPage = ["/unauthorised"];
export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  // if (user && !allowPublicLoginPage.includes(location.pathname)) {
  //   return <Navigate to={location.pathname} replace />;
  // }

  return children;
}