"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useGetDiscussion } from "./useGetDiscussion";
import { useParams } from "next/navigation";

const Discussion = () => {
  const { id } = useParams();

  const { discussion } = useGetDiscussion(id);

  return (
    <div className="w-full h-screen flex flex-col py-8 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 flex-1 overflow-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {discussion?.title}
          </h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {discussion?.body}
          </p>
        </div>
        <div className="mt-10 space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@username</div>
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  2 months ago
                </div>
              </div>
              <p>
                This is a comment. It should be readable and easy to understand.
              </p>
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost">
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Reply</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@username</div>
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  2 months ago
                </div>
              </div>
              <p>
                This is a comment. It should be readable and easy to understand.
              </p>
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost">
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Reply</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 sticky bottom-0 w-3/4 self-center">
        <form className="space-y-4">
          <Textarea
            className="flex-1 min-w-0"
            placeholder="Type your comment here."
          />
          <div className="flex justify-end">
            <Button type="submit">Post Comment</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Discussion;

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
