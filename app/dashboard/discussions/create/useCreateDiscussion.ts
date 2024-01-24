import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export const useCreateDiscussion = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const router = useRouter();

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/discussions", {
      method: "POST",
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      toast({
        title: "Discussion created!",
        variant: "success",
      });

      router.replace("/dashboard/discussions");
    }
  };

  return {
    title,
    setTitle,
    body,
    setBody,
    handleCreateDiscussion,
  };
};
