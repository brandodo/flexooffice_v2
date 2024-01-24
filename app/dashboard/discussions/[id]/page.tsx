import React, { Suspense } from "react";
import { CommentInputBox } from "@/components/CommentInputBox/CommentInputBox";
import DiscussionContent from "@/components/DiscussionContent/DiscussionContent";
import { DiscussionSkeleton } from "./skeleton";

const Discussion = ({ params }) => {
  return (
    <div className="w-full h-screen flex flex-col py-8 md:py-16 lg:py-20">
      {/* Discussions are rendered on server as it relies on API data */}
      <Suspense fallback={<DiscussionSkeleton />}>
        <DiscussionContent params={params} />
      </Suspense>

      {/* Text area rendered on client side */}
      <CommentInputBox />
    </div>
  );
};

export default Discussion;
