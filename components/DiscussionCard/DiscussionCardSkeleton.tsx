import React from "react";
import { Skeleton } from "../ui/skeleton";

const DiscussionCardSkeleton = () => {
  return (
    <article className="border rounded p-4 mb-4 w-3/4">
      <header className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/3" />

        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </header>
      <Skeleton className="h-3 w-3/4" />
      <footer className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-6" />
        </div>

        <Skeleton className="h-3 w-24" />
      </footer>
    </article>
  );
};

export default DiscussionCardSkeleton;
