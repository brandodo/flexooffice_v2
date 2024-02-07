import React from "react";
import DiscussionComment from "./DiscussionComment/DiscussionComment";

const DiscussionComments = ({ comments }) => {
  return (
    <div className="flex max-h-full flex-col space-y-6 overflow-y-scroll">
      {comments?.length > 0 &&
        comments?.map((comment) => {
          return (
            <DiscussionComment
              key={comment?._id}
              author={comment?.author?.name}
              createdDate={comment?.createdAt}
              body={comment?.body}
            />
          );
        })}
    </div>
  );
};
export default DiscussionComments;
