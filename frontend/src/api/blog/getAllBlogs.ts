import axios from "axios";
import { type Blog } from "../../types/blog"; 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllBlogs = async (page = 1, limit = 10): Promise<{
  blogs: Blog[];
  totalBlogs: number;
  totalPages: number;
}> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${BACKEND_URL}/api/v1/blog/bulk?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { blogs, totalBlogs, totalPages } = response.data;

  console.log("✅ Extracted blogs from API:", blogs);

  return {
    blogs,
    totalBlogs,
    totalPages,
  };
};
