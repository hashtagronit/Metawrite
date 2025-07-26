import { useEffect, useState } from "react";
import { getAllBlogs } from "../api/blog/getAllBlogs";
import { type Blog } from "../types/blog";

export const useGetAllBlogs = (page = 1, limit = 10) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ totalBlogs: 0, totalPages: 0 });

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { blogs, totalBlogs, totalPages } = await getAllBlogs(page, limit);
        setBlogs(blogs || []);
        setPagination({ totalBlogs, totalPages });
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, limit]);

  return { blogs, loading, pagination };
};
