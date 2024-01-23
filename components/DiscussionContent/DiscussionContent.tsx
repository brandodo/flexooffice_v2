"use server";

import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Internal API call to retrieve discussion data
 * @param id string id of selected discussion
 * @returns data pertaining to given discussion id
 */
const handleGetDiscussion = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/discussions/${id}`, {
    method: "GET",
  });

  const discussion = await res.json();

  return discussion;
};

/**
 * Internal API call to retrieve comments filtered by discussion id
 * @param discussionId string id of selected discussion
 * @returns array of comments for given discussion id
 */
const handleGetComments = async (discussionId: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/comments/${discussionId}`,
    {
      method: "GET",
    }
  );

  const comments = await res.json();

  return comments;
};

/**
 * Render the component for the selected Discussion
 * @param param0 contains id to be used to fetch discussion data
 * @returns server side rendered component
 */
const DiscussionContent = async ({ params }) => {
  // Auth validation of client's session
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const [discussion, comments] = await Promise.all([
    handleGetDiscussion(params?.id),
    handleGetComments(params?.id),
  ]);

  return (
    <div className="container px-4 md:px-6 flex-1 overflow-auto w-3/4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {discussion?.title}
        </h1>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          {discussion?.body}
        </p>
      </div>
      <div className="mt-10 space-y-6">
        {comments?.length > 0 &&
          comments?.map((comment) => {
            return (
              <div className="flex items-start space-x-4" key={comment._id}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{comment.author.name}</div>
                    <div className="text-gray-500 text-xs dark:text-gray-400">
                      {new Date(comment.createdAt).toDateString()}
                    </div>
                  </div>
                  <p>{comment.body}</p>
                  {/* <div className="flex items-center gap-4">
                    <Button size="icon" variant="ghost">
                      <XIcon className="h-5 w-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <XIcon className="h-5 w-5" />
                      <span className="sr-only">Reply</span>
                    </Button>
                  </div> */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DiscussionContent;

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
