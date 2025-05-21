import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { user, loading, justSignedUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !justSignedUp) {
      navigate("/dashboard");
    }
  }, [user, justSignedUp, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
