"use client";

import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return isLogin ? (
    <Login setIsLogin={setIsLogin} />
  ) : (
    <Signup setIsLogin={setIsLogin} />
  );
}
