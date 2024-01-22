import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    loading,
    error,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  };
};
