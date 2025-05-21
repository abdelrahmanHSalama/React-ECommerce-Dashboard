import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Helmet>
        <title>Signin or Signup | NextShop Dashboard</title>
      </Helmet>
      <div className="w-full max-w-sm">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
