import { useParams } from "react-router-dom";
import  Appbar  from "../components/Appbar";
import { FullCard } from "../components/FullCard";
import { useGetBlogById } from "../hooks/useGetBlogById";
import FullCardSkeleton from "../components/FullCardSkeleton";

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, loading, error } = useGetBlogById(id);

  if (loading) return <div className="max-w-3xl mx-auto mt-6 px-4"><FullCardSkeleton/></div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center p-4">Blog not found</div>;

  return (
    <div className="bg-[#f9f5f1] h-max min-h-screen">
      <Appbar />
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <FullCard blog={blog} />
      </div>
    </div>
  );
};
