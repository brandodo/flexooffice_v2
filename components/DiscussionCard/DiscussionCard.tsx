"use client";

import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import VoteButtons from "./VoteButtons/VoteButtons";

export const DiscussionCard = ({ data }) => {
  const router = useRouter();

  return (
    <article
      className="border rounded p-4 mb-4 w-3/4 hover:bg-gray-100 hover:cursor-pointer transition-all"
      onClick={() => router.push(`/discussions/${data._id}`)}
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
        <VoteButtons data={data} />
        <p className="text-sm text-gray-500">{data.comments} comments</p>
      </footer>
    </article>
  );
};
