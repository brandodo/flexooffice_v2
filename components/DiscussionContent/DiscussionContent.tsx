"use server";

import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/configs/auth/authOptions";
import DiscussionComments from "../DiscussonComments/DiscussionComments";
import DiscussionPostDetails from "../DiscussionPostDetails/DiscussionPostDetails";

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
    `${process.env.BASE_URL}/api/discussions/${discussionId}/comments`,
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
    <div className="flex flex-col flex-1 overflow-auto gap-2 py-8 pb-24">
      <DiscussionPostDetails
        title={discussion?.title}
        image={discussion?.image}
        body={discussion?.body}
        commentCount={discussion?.comments}
      />

      <DiscussionComments comments={comments} />
    </div>
  );
};

export default DiscussionContent;
