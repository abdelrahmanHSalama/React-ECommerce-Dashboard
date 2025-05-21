import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [hashError, setHashError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setJustSignedUp } = useAuth();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    try {
      const { data: authUser, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName: fullName,
          },
        },
      });

      if (authUser?.user) {
        await supabase.from("profiles").insert({
          id: authUser.user.id,
          role: "seller",
        });
      }

      if (error) throw error;
      setSuccess(true);
      setJustSignedUp(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An Error Occured!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An Error Occured!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = () => {
    setIsLoggingIn((prev) => !prev);
    setFullName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setError(null);
    setIsLoading(false);
    setSuccess(false);
    // setHashError(null);
  };

  // ✏️ OTP Error Handling
  // useEffect(() => {
  //   const hash = window.location.hash;
  //   if (hash.includes("error")) {
  //     const params = new URLSearchParams(hash.substring(1));
  //     const errorCode = params.get("error_code");
  //     const errorDescription = params.get("error_description");

  //     if (errorCode === "otp_expired") {
  //       setHashError(
  //         "This confirmation link has expired. Please sign up again."
  //       );
  //     } else {
  //       setHashError(
  //         decodeURIComponent(errorDescription || "An unknown error occurred.")
  //       );
  //     }

  //     // Clear the hash from URL
  //     window.history.replaceState(null, "", window.location.pathname);
  //   }
  // }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h1 className="mx-auto text-[1.5rem] font-bold">NextShop Dashboard</h1>
      {/* {hashError && (
        <div className="border border-red-400 bg-red-100 text-red-800 text-sm rounded-lg shadow-sm p-4">
          {hashError}
        </div>
      )} */}
      {!isLoggingIn && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Create a new account.</CardDescription>
          </CardHeader>
          {success && (
            <div className="border border-green-400 bg-green-200 text-green-800 text-sm rounded-lg shadow-sm p-4 mx-6 flex gap-2">
              <p>🥳</p>
              <p>
                Account created successfully! You will be redirected to the
                dashboard now.
              </p>
            </div>
          )}
          <CardContent>
            <form onSubmit={handleSignup} autoComplete="off">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="new-email"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating an account..." : "Sign up"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline underline-offset-4 hover:cursor-pointer"
                  onClick={() => setIsLoggingIn((prev) => !prev)}
                >
                  Sign in
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* {!isLoggingIn && success && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              🎉 Account created successfully!
            </CardTitle>
            <CardDescription>
              Please check your email to confirm.
            </CardDescription>
          </CardHeader>
        </Card>
      )} */}

      {isLoggingIn && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>Sign in to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing you in..." : "Sign in"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="underline underline-offset-4 hover:cursor-pointer"
                  onClick={handleSwitchMode}
                >
                  Sign up
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
