
import axios from "axios";
import { type Blog } from "../../types/blog";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getBlogById = async (id: string): Promise<Blog> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
