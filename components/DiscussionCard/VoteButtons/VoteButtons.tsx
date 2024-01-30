import React from "react";
import { useVote } from "./useVote";
import { Button } from "@/components/ui/button";

const VoteButtons = ({ data }) => {
  const {
    upvotes,
    setUpvotes,
    downvotes,
    setDownvotes,
    handleVote,
    hasVoted,
    setHasVoted,
  } = useVote(data);

  console.log(data);
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <p>{upvotes}</p>
        <Button
          onClick={async (e) => {
            e.stopPropagation();

            if (hasVoted === "down") {
              setHasVoted("up");
              setDownvotes(downvotes - 1);
              setUpvotes(upvotes + 1);
            }

            if (hasVoted === "up") {
              setHasVoted(null);
              setUpvotes(upvotes - 1);
            } else {
              setHasVoted("up");
              setUpvotes(upvotes + 1);
            }

            await handleVote("up");
          }}
          className="bg-clear hover:bg-gray-300"
        >
          <ArrowUpIcon className="text-gray-500" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={async (e) => {
            e.stopPropagation();

            if (hasVoted === "up") {
              setHasVoted("down");
              setUpvotes(upvotes - 1);
              setDownvotes(downvotes + 1);
            }

            if (hasVoted === "down") {
              setHasVoted(null);
              setDownvotes(downvotes - 1);
            } else {
              setHasVoted("down");
              setDownvotes(downvotes + 1);
            }

            await handleVote("down");
          }}
          className="bg-clear hover:bg-gray-300"
        >
          <ArrowDownIcon className="text-gray-500" />
        </Button>

        <p>{downvotes}</p>
      </div>
    </div>
  );
};

function ArrowDownIcon(props) {
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
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

export default VoteButtons;
