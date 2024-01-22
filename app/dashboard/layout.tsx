"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main>
      <aside className="fixed left-0 top-0 flex flex-col w-14 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out hover:w-64 z-50">
        <nav className="group flex-1 overflow-y-auto py-2">
          <div className="flex items-center h-14 px-4 hover:bg-gray-700 hover:cursor-pointer">
            <Avatar className="h-6 w-6">
              <AvatarImage
                className=" object-cover object-center"
                src={session?.user?.profile_image}
              />
            </Avatar>
            <span className="ml-4 line-clamp-1 group-hover:block hidden">
              Profile
            </span>
          </div>
          <div
            className="flex items-center h-14 px-4 hover:bg-gray-700 hover:cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="ml-4 line-clamp-1 group-hover:block hidden">
              Home
            </span>
          </div>

          <div
            className="flex items-center h-14 px-4 hover:bg-gray-700 hover:cursor-pointer"
            onClick={() => router.push("/dashboard/discussions")}
          >
            <MessageCircleIcon className="h-6 w-6" />
            <span className="ml-4 line-clamp-1 group-hover:block hidden">
              Discussions
            </span>
          </div>

          <div className="flex flex-col absolute w-full bottom-0">
            <div
              className="flex items-center h-14 px-4 hover:bg-gray-700 hover:cursor-pointer"
              onClick={() => router.push("/dashboard/settings")}
            >
              <SettingsIcon className="h-6 w-6" />
              <span className="ml-4 line-clamp-1 group-hover:block hidden">
                Settings
              </span>
            </div>

            <div
              className="flex items-center h-14 px-4 hover:bg-gray-700 hover:cursor-pointer"
              onClick={(e) => {
                signOut();
              }}
            >
              <LogOutIcon className="h-6 w-6" />
              <span className="ml-4 line-clamp-1 group-hover:block hidden">
                Logout
              </span>
            </div>
          </div>
        </nav>
      </aside>

      {children}
    </main>
  );
}
