import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    setTimeout(() => navigate("/auth"), 5000);
    return (
      <div>
        <h1 className="text-[1.5rem] font-semibold">⚠️ Not Authenticated!</h1>
        <p>Redirecting to Authentication Form...</p>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
