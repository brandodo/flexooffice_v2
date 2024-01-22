import axios from "axios";
import { useEffect, useState } from "react";

type DiscussionType = {
  author: {
    name: string;
    profile_image: string;
  };
  _id: string;
  title: string;
  body: string;
  comments: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  //   __v: 0;
};

export const useGetDiscussion = (id) => {
  const [discussion, setDiscussion] = useState<DiscussionType | null>(null);

  useEffect(() => {
    const handleGetDiscussion = async () => {
      const res = await fetch(`/api/discussions/${id}`, {
        method: "GET",
      });

      const data = await res.json();

      console.log(data);

      setDiscussion(data);
    };

    handleGetDiscussion();
  }, []);

  return {
    discussion,
  };
};
