import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createBlog = async (token: string, title: string, content: string) => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
    title,
    content,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};
