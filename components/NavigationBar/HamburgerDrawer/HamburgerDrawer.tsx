import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { MenuIcon, ArrowLeft, MoonIcon, SunIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { MessageCircleIcon } from "@/components/icons/MessageIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { LogOutIcon } from "@/components/icons/LogOutIcon";

export const HamburgerDrawer = ({
  pathname,
  setPathname,
  theme,
  handleThemeSwitch,
}) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="md:hidden">
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="h-screen rounded-none flex flex-col gap-6 p-5">
        <DrawerHeader className="gap-6">
          <DrawerClose asChild>
            <ArrowLeft />
          </DrawerClose>

          <DrawerClose asChild>
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
          </DrawerClose>

          <DrawerClose asChild>
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
          </DrawerClose>

          <DrawerClose asChild>
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
          </DrawerClose>

          <DrawerClose asChild>
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
          </DrawerClose>
        </DrawerHeader>

        <DrawerFooter>
          <div className="flex gap-2 items-center flex-1 justify-between">
            <Button
              className="self-end"
              variant="ghost"
              onClick={() => signOut()}
            >
              <LogOutIcon />
              Logout
            </Button>

            <Button onClick={handleThemeSwitch} variant="ghost">
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
