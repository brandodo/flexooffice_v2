import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CommentSkeleton = () => {
  return (
    <div className="mt-10 space-y-6 w-full">
      <div className="flex items-start space-x-4 w-full">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-4 w-3/4" />

          <div className="flex items-center gap-4 w-full">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const DiscussionSkeleton = () => {
  return (
    <div className="flex flex-1">
      <div className="container px-4 md:px-6 flex-1 overflow-auto w-3/4">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>

        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    </div>
  );
};
