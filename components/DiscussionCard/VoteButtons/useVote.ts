import { useState } from "react";

export const useVote = (data: any) => {
  const discussionId = data?._id;
  const [upvotes, setUpvotes] = useState(() => data?.upvotes ?? 0);
  const [downvotes, setDownvotes] = useState(() => data?.downvotes ?? 0);

  const handleVote = async (voteType: "up" | "down") => {
    try {
      const res = await fetch(`/api/discussions/${discussionId}/vote`, {
        method: "PUT",
        body: JSON.stringify({
          vote: voteType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setUpvotes(() => data.data.upvotes);
        setDownvotes(() => data.data.downvotes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    upvotes,
    downvotes,
    setUpvotes,
    setDownvotes,
    handleVote,
  };
};
