import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useSignup } from "./useSignup";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
    getRootProps,
    getInputProps,
    imagePreview,
  } = useSignup(setIsLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-md px-8 py-6 bg-green-50 rounded-lg border">
        <div className="flex justify-center w-full rounded-md p-2">
          <img alt="Logo" className="h-24" src="flex-office-logo.png" />
        </div>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="space-y-1">
            <Label className="text-green-700" htmlFor="avatar">
              Avatar
            </Label>
            <div
              {...getRootProps()}
              className="transition-all ease-in-out border border-dashed border-2 rounded-lg p-2 flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              <div>
                {imagePreview?.length > 0 && (
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      alt="@shadcn"
                      src={imagePreview}
                      className="object-cover object-center"
                    />
                  </Avatar>
                )}
              </div>
              Upload or drag {imagePreview ? "a different" : "an"} image!
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-green-700" htmlFor="name">
              Full Name
            </Label>
            <Input
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-900"
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
            <Label className="text-green-700" htmlFor="password">
              Password
            </Label>
            <Input
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-900"
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
            <Label className="text-green-700" htmlFor="confirm-password">
              Confirm Password
            </Label>
            <Input
              className="w-full border-gray-300 focus:ring-2 focus:ring-green-900"
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
            className="w-full bg-emerald-700 hover:bg-emerald-600"
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
