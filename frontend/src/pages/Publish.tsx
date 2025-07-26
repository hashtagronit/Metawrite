import Appbar from "../components/Appbar";
import BlogLayout from "../components/BlogLayout";
import { useCreateBlog } from "../hooks/useCreateBlog";

function Publish() {
  const { handleCreateBlog, loading } = useCreateBlog();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8 bg-[#f9f5f1] h-screen">
        <BlogLayout onSubmit={handleCreateBlog} loading={loading} />
      </div>
    </div>
  );
}

export default Publish;
