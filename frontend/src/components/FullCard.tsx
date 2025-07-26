
import { type Blog } from "../types/blog";

export const FullCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-white  shadow-md rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 ">
        {blog.title}
      </h1>
      <p className="text-gray-500  text-sm mb-4">
        by {blog.author?.name || "Unknown"} • {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="text-gray-800 leading-relaxed break-words overflow-x-auto">
        {blog.content}
      </div>
    </div>
  );
};
