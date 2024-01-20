import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLogin } from "./useLogin";

const Login = ({
  setIsLogin,
}: {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const { error, email, password, setEmail, setPassword, handleSubmit } =
    useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-[#4F6F52]">
      <div className="w-full max-w-md px-8 py-6 bg-emerald-50 dark:bg-[#739072] rounded-lg">
        <div className="flex justify-center w-full rounded-md p-2 mb-4">
          <img alt="Logo" className="h-24" src="flex-office-logo.png" />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label
              className="text-[#4F6F52] dark:text-[#D2E3C8]"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              className="w-full border-[#4F6F52] dark:border-[#D2E3C8] focus:ring-2 focus:ring-[#4F6F52] dark:focus:ring-[#D2E3C8]"
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
              <Label
                className="text-[#4F6F52] dark:text-[#D2E3C8]"
                htmlFor="password"
              >
                Password
              </Label>
              <Link
                className="text-sm text-[#739072] hover:underline dark:text-[#86A789]"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              className="w-full border-[#4F6F52] dark:border-[#D2E3C8] focus:ring-2 focus:ring-[#4F6F52] dark:focus:ring-[#D2E3C8]"
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <Button
            className="w-full bg-[#4F6F52] hover:bg-[#739072] dark:bg-[#D2E3C8] dark:hover:bg-[#86A789]"
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#4F6F52] dark:border-[#D2E3C8]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-emerald-50 dark:bg-[#739072]">or</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="w-full bg-[#4F6F52] hover:bg-[#739072] dark:bg-[#D2E3C8] dark:hover:bg-[#86A789]"
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
