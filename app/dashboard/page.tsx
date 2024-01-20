"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen bg-emerald-100 dark:bg-emerald-900">
      <header className="flex h-16 items-center border-b border-emerald-200 dark:border-emerald-800 px-4 sm:px-8">
        <Button onClick={() => signOut()}>Logout</Button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 bg-emerald-50 dark:bg-emerald-800">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              alt="@shadcn"
              src="patstar.png"
              className="object-contain object-center"
            />
            <AvatarFallback className="bg-lime-500 text-white">
              CN
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            You have 3 unread messages.
          </p>
        </div>
      </main>
      <footer className="flex h-16 items-center border-t border-emerald-200 dark:border-emerald-800 px-4 sm:px-8">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 flexooffice. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-lime-600 dark:text-lime-400 hover:underline underline-offset-4"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-lime-600 dark:text-lime-400 hover:underline underline-offset-4"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
