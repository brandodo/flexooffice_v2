"use client";

import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCommentInput } from "./useCommentInput";
import { useParams } from "next/navigation";

export const CommentInputBox = () => {
  const params = useParams();

  const { commentBody, handlePostComment, setCommentBody } = useCommentInput(
    params?.id as string
  );

  return (
    <div className="bg-white py-6 sticky bottom-0 w-full self-center border-t dark:bg-transparent">
      <form className="space-y-4">
        <Textarea
          className="flex-1 min-w-0"
          placeholder="Type your comment here."
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={handlePostComment}
            disabled={commentBody.length === 0}
          >
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};
