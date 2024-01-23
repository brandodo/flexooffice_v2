import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const useCommentInput = (discussionId: string) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [commentBody, setCommentBody] = useState<string>("");

  const handlePostComment = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/comments/${discussionId}`, {
      method: "POST",
      body: JSON.stringify({
        author: {
          name: session?.user?.name,
          profile_image: session?.user?.profile_image,
        },
        body: commentBody,
      }),
    });

    if (res.ok) {
      router.refresh();

      toast({
        title: "Comment posted!",
        variant: "success",
      });

      setCommentBody("");
    }
  };

  return {
    commentBody,
    setCommentBody,
    handlePostComment,
  };
};
