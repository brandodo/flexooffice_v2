"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-1 h-screen flex-col p-8 sm:p-8">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            alt="@shadcn"
            src={session?.user?.profile_image}
            className="object-contain object-center"
          />
          <AvatarFallback className="bg-lime-500 text-white">CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          You have 3 unread messages.
        </p>
      </div>
    </main>
  );
}
