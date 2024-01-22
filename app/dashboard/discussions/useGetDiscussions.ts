import { useEffect, useState } from "react";

export const useGetDiscussions = () => {
  const [discussions, setDiscussions] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const getDiscussions = async () => {
      const response = await fetch("/api/discussions", { method: "GET" });
      const data = await response.json();

      setDiscussions(data);
    };

    getDiscussions();
  }, []);

  return { discussions };
};
