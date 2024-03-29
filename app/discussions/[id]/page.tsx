import React, { Suspense } from "react";
import { CommentInputBox } from "@/components/CommentInputBox/CommentInputBox";
import DiscussionContent from "@/components/DiscussionContent/DiscussionContent";
import { DiscussionSkeleton } from "./skeleton";

const Discussion = async ({ params }) => {
  return (
    <div className="px-6 py-0 w-full flex flex-col h-screen">
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
