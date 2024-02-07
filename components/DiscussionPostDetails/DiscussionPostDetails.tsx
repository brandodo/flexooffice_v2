import React from "react";

const DiscussionPostDetails = ({ title, image, body, commentCount }) => {
  return (
    <div className="flex flex-col h-max space-y-6">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        {title}
      </h1>
      {image && (
        <img className="w-64 rounded-lg" src={image} alt="discussion image" />
      )}

      <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        {body}
      </p>

      <p className="text-gray-500">{commentCount} Comment(s)</p>
    </div>
  );
};

export default DiscussionPostDetails;
