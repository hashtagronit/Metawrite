import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useGetAllBlogs } from "../hooks/useGetAllBlogs";

function HomePage() {
  const { loading, blogs } = useGetAllBlogs();
  console.log("Blogs received:", blogs);


  return (
    <div>
      <Appbar />
      <div className="flex justify-center bg-[#f9f5f1]">
        <div>
          {loading ? (
            Array(4).fill(0).map((_, i) => <BlogSkeleton key={i} />)
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author?.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={new Date(blog.createdAt).toLocaleDateString()}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
