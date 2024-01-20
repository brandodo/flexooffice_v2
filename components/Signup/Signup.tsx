import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useSignup } from "./useSignup";

const Signup = ({
  setIsLogin,
}: {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    email,
    name,
    password,
    confirmPassword,
    signUpDispatch,
    handleSignup,
  } = useSignup(setIsLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-[#4F6F52]">
      <div className="w-full max-w-md px-8 py-6 bg-emerald-50 dark:bg-[#739072] rounded-lg">
        <div className="flex justify-center w-full rounded-md p-2 mb-4">
          <img alt="Logo" className="h-24" src="flex-office-logo.png" />
        </div>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="space-y-1">
            <Label
              className="text-[#4F6F52] dark:text-[#D2E3C8]"
              htmlFor="name"
            >
              Full Name
            </Label>
            <Input
              className="w-full border-[#4F6F52] dark:border-[#D2E3C8] focus:ring-2 focus:ring-[#4F6F52] dark:focus:ring-[#D2E3C8]"
              id="name"
              placeholder="John Doe"
              required
              type="text"
              value={name}
              onChange={(e) => {
                signUpDispatch({
                  type: "UPDATE_INPUT",
                  field: "name",
                  payload: e.target.value,
                });
              }}
            />
          </div>
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
              onChange={(e) => {
                signUpDispatch({
                  type: "UPDATE_INPUT",
                  field: "email",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="space-y-1">
            <Label
              className="text-[#4F6F52] dark:text-[#D2E3C8]"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              className="w-full border-[#4F6F52] dark:border-[#D2E3C8] focus:ring-2 focus:ring-[#4F6F52] dark:focus:ring-[#D2E3C8]"
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => {
                signUpDispatch({
                  type: "UPDATE_INPUT",
                  field: "password",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="space-y-1">
            <Label
              className="text-[#4F6F52] dark:text-[#D2E3C8]"
              htmlFor="confirm-password"
            >
              Confirm Password
            </Label>
            <Input
              className="w-full border-[#4F6F52] dark:border-[#D2E3C8] focus:ring-2 focus:ring-[#4F6F52] dark:focus:ring-[#D2E3C8]"
              id="confirm-password"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                signUpDispatch({
                  type: "UPDATE_INPUT",
                  field: "confirmPassword",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <Button
            className="w-full bg-[#4F6F52] hover:bg-[#739072] dark:bg-[#D2E3C8] dark:hover:bg-[#86A789]"
            type="submit"
            disabled={
              name === "" ||
              email === "" ||
              password === "" ||
              confirmPassword === ""
            }
          >
            Sign Up
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
              onClick={() => setIsLogin(true)}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
