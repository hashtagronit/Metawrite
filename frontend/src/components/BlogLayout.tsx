import { useState } from "react";
import TextEditor from "./TextEditor";

interface BlogLayoutProps {
  onSubmit: (title: string, content: string) => void;
  loading: boolean;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="max-w-screen-lg w-full ">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="w-full bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        placeholder="Title"
      />
      <TextEditor onChange={(e) => setContent(e.target.value)} />

      <button
        onClick={() => onSubmit(title, content)}
        type="button"
        disabled={loading}
        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </button>
    </div>
  );
};

export default BlogLayout;
