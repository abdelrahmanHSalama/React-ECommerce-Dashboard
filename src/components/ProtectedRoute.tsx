import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user)
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AuthForm />
        </div>
      </div>
    );
  return children;
};

export default ProtectedRoute;
