import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLogin } from "./useLogin";
import { Loader } from "lucide-react";

const Login = ({
  setIsLogin,
}: {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    loading,
    error,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-md px-8 py-6 bg-green-50 rounded-lg">
        <div className="flex justify-center w-full rounded-md p-2">
          <img alt="Logo" className="h-24" src="flex-office-logo.png" />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label className="text-green-700" htmlFor="email">
              Email
            </Label>
            <Input
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-900"
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label className="text-green-700" htmlFor="password">
                Password
              </Label>
              <Link className="text-sm text-green-900 hover:underline" href="#">
                Forgot password?
              </Link>
            </div>
            <Input
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-900"
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <Button
            className="w-full bg-emerald-700 hover:bg-emerald-600"
            type="submit"
            disabled={!email || !password || loading}
          >
            {loading ? <Loader /> : "Login"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-emerald-50 text-gray-700">or</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="w-full bg-emerald-700 hover:bg-emerald-600"
              type="button"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
