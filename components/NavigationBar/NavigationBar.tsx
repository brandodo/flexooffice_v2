"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { ArrowLeft, MenuIcon, MoonIcon, SunIcon } from "lucide-react";

import { HamburgerDrawer } from "./HamburgerDrawer/HamburgerDrawer";
import { HomeIcon } from "../icons/HomeIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
import { MessageCircleIcon } from "../icons/MessageIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { LogOutIcon } from "../icons/LogOutIcon";

export const NavigationBar = () => {
  const { data: session } = useSession();
  const [pathname, setPathname] = useState<string>("/dashboard");
  const [theme, setTheme] = useState<string>("light");

  const handleThemeSwitch = () => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme !== "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");

      return;
    }

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setTheme("light");
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.documentElement.classList.add(currentTheme);
      setTheme(currentTheme);
    }
  }, []);

  if (!session) return null;

  return (
    <header className="flex items-center h-max p-4 border-b md:px-6 sticky top-0 bg-white dark:bg-slate-900 shadow z-1 w-full">
      <nav className="flex gap-6 text-lg font-medium md:gap-8 items-center justify-between flex-1">
        <HamburgerDrawer
          pathname={pathname}
          setPathname={setPathname}
          theme={theme}
          handleThemeSwitch={handleThemeSwitch}
        />
        <div className="gap-6 hidden md:flex">
          <Link
            onClick={() => {
              setPathname("/dashboard");
            }}
            className={`${
              pathname === "/dashboard"
                ? "font-bold"
                : "text-gray-500 dark:text-gray-400"
            }`}
            href="/dashboard"
          >
            <div className="flex items-center gap-2">
              <HomeIcon />
              Dashboard
            </div>
          </Link>
          <Link
            onClick={() => {
              setPathname("/schedule");
            }}
            className={`${
              pathname === "/schedule"
                ? "font-bold"
                : "text-gray-500 dark:text-gray-400"
            }`}
            href="/schedule"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon />
              Schedule
            </div>
          </Link>
          <Link
            onClick={() => {
              setPathname("/discussions");
            }}
            className={`${
              pathname === "/discussions"
                ? "font-bold"
                : "text-gray-500 dark:text-gray-400"
            }`}
            href="/discussions"
          >
            <div className="flex items-center gap-2">
              <MessageCircleIcon />
              Discussions
            </div>
          </Link>
          <Link
            onClick={() => {
              setPathname("/settings");
            }}
            className={`${
              pathname === "/settings"
                ? "font-bold"
                : "text-gray-500 dark:text-gray-400"
            } `}
            href="/settings"
          >
            <div className="flex items-center gap-2">
              <SettingsIcon />
              Settings
            </div>
          </Link>
        </div>

        <div className="hidden md:flex gap-2 items-center flex-1 justify-end">
          <Button onClick={handleThemeSwitch} variant="ghost">
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Button className="self-end" onClick={() => signOut()}>
            <LogOutIcon />
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};
