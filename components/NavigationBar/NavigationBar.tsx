"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { MoonIcon, SunIcon } from "lucide-react";

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

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
    <header className="flex items-center h-max p-4 border-b md:px-6 sticky top-0 bg-white dark:bg-slate-900 shadow z-1">
      <nav className="flex gap-6 text-lg font-medium md:gap-8 items-center justify-between flex-1">
        <div className="flex gap-6">
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

        <div className="flex gap-2 items-center">
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
