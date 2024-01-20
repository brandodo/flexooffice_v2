import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username/password");
        return;
      }

      console.log("redirecting?");
      router.replace("dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    error,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  };
};
