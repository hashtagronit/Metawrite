import { useState } from "react";
import { createBlog } from "../api/blog/createBlog";
import { useNavigate } from "react-router-dom";

export const useCreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateBlog = async (title: string, content: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const data = await createBlog(token, title, content);
      navigate(`/blog/${data.id}`);
    } catch (err) {
      console.error("Blog creation failed:", err);
      alert("Something went wrong while publishing.");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateBlog, loading };
};
