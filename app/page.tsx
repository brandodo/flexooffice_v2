"use client";

import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <Login setIsLogin={setIsLogin} />
  ) : (
    <Signup setIsLogin={setIsLogin} />
  );
}
