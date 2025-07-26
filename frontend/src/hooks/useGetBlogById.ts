
import { useEffect, useState } from "react";
import { getBlogById } from "../api/blog/getBlogById";
import { type Blog } from "../types/blog";

export const useGetBlogById = (id?: string) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog by ID", err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { blog, loading, error };
};
