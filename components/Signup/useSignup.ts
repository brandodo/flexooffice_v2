import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useToast } from "../ui/use-toast";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";

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
const signUpAccount = async (name, email, password, profileImageUrl) => {
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
        profile_image: profileImageUrl,
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
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader");

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const imagePreview = useMemo(() => {
    return selectedImage ? URL.createObjectURL(selectedImage[0]) : "";
  }, [selectedImage]);

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

    const imageUploadRes:
      | {
          name: string;
          size: number;
          key: string;
          serverData: {
            uploadedBy: string;
          };
          url: string;
        }[]
      | undefined = await startUpload(selectedImage);

    const signupRes = await signUpAccount(
      signUpFields.name,
      signUpFields.email,
      signUpFields.password,
      imageUploadRes?.[0]?.url
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
    selectedImage,
    setSelectedImage,
    getRootProps,
    getInputProps,
    imagePreview,
  };
};
