import { useEffect, useState } from "react";

export const useGetDiscussions = () => {
  const [discussions, setDiscussions] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDiscussions = async () => {
      setLoading(true);
      const response = await fetch("/api/discussions", { method: "GET" });
      const data = await response.json();

      setDiscussions(data);
      setLoading(false);
    };

    getDiscussions();
  }, []);

  return { discussions, loading };
};
