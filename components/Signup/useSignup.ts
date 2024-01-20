import { Dispatch, SetStateAction, useReducer, useState } from "react";
import { useToast } from "../ui/use-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const signUpReducer = (
  state: any,
  action: { type: any; field: any; payload: any }
) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };

    case "RESET":
      return {
        ...initialState,
      };
  }
};

/**
 * Function to validate if provided email address exists in DB
 * @param email string representing user's email input
 * @returns a valid user in DB or undefined/null if no user is found
 */
const validateEmail = async (email: string) => {
  try {
    const emailExistsRes = await fetch("/api/emailExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const { user } = await emailExistsRes.json();

    return user;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to create a new user in DB
 * @param name string representing user's name input
 * @param email stinrg representing user's email input
 * @param password string representing user's password input
 * @returns object to validate if user has been created
 */
const signUpAccount = async (name, email, password) => {
  try {
    const signupRes = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    return signupRes;
  } catch (error) {
    console.log(error);
  }
};

export const useSignup = (setIsLogin: Dispatch<SetStateAction<boolean>>) => {
  const { toast } = useToast();

  const [signUpFields, signUpDispatch] = useReducer(
    signUpReducer,
    initialState
  );
  const [emailExists, setEmailExists] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const user = await validateEmail(signUpFields.email);

    // Email exists validation
    if (user) {
      setEmailExists(true);
      toast({
        title: "😓 Email already exists",
        description: "Please try another email.",
        variant: "error",
      });

      return;
    }

    // Confirm password validation
    if (signUpFields.password !== signUpFields.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const signupRes = await signUpAccount(
      signUpFields.name,
      signUpFields.email,
      signUpFields.password
    );

    // Reset state on successful signup
    if (signupRes?.ok) {
      signUpDispatch({ type: "RESET", payload: "", field: "" });
      toast({
        title: "🎉 Congratulations!",
        description: "🚀 You're all set up.",
        variant: "success",
      });

      setIsLogin(true);
    }
  };

  return {
    name: signUpFields.name,
    email: signUpFields.email,
    password: signUpFields.password,
    confirmPassword: signUpFields.confirmPassword,
    signUpDispatch,
    handleSignup,
  };
};
