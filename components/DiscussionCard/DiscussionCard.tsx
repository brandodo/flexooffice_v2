"use client";

import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

export const DiscussionCard = ({ data }) => {
  const router = useRouter();

  return (
    <article
      className="border rounded p-4 mb-4 w-3/4 hover:bg-gray-100 hover:cursor-pointer transition-all"
      onClick={() => router.push(`/dashboard/discussions/${data._id}`)}
    >
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{data.title}</h2>

        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src={data.author.profile_image} />
          </Avatar>
          <p className="text-sm text-gray-500">{data.author.name}</p>
        </div>
      </header>
      <p className="mt-2">{data.body}</p>
      <footer className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <p>{data.upvotes}</p>
            <ArrowUpIcon className="h-6 w-6 text-gray-500" />
          </div>

          <div className="flex items-center gap-1">
            <ArrowDownIcon className="h-6 w-6 text-gray-500" />
            <p>{data.downvotes}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{data.comments} comments</p>
      </footer>
    </article>
  );
};

function ArrowDownIcon(props) {
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
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
