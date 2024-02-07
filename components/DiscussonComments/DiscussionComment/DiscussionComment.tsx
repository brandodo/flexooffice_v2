import React from "react";

const DiscussionComment = ({ author, createdDate, body }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{author}</div>
          <div className="text-gray-500 text-xs dark:text-gray-400">
            {new Date(createdDate).toDateString()}
          </div>
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default DiscussionComment;
