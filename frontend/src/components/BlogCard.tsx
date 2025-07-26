import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Circle from "./Circle";

interface BlogCardProps {
  readonly id: number;
  readonly authorName: string;
  readonly title: string;
  readonly content: string;
  readonly publishedDate: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}) => {
  const plainText = content.replace(/<[^>]*>?/gm, "");
  const contentPreview =
    plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;
  const wordsPerMinute = 200;
  const minutesToRead = Math.max(
    1,
    Math.ceil(plainText.split(/\s+/).length / wordsPerMinute)
  );

  return (
    <article
      className="block w-screen max-w-screen-md mx-auto border-b-1 border-gray-500 transition-all p-5 mb-6"
      aria-label={`Read blog post titled ${title}`}
      data-testid="blog-card"
    >
      {/* Header */}
      <header className="flex items-center text-sm text-neutral-600  mb-1">
        <Avatar name={authorName} />
        <span className="pl-2 font-medium ">{authorName}</span>
        <Circle />
        <time className="pl-2 text-neutral-500 " dateTime={publishedDate}>
          {publishedDate}
        </time>
      </header>

      {/* Title */}
      <h2 className="text-xl font-semibold text-neutral-800  hover:underline leading-snug">
        <Link to={`/blog/${id}`} aria-label={`Read full blog: ${title}`}>
          {title}
        </Link>
      </h2>

      {/* Preview Content */}
      <p className="pt-2 text-sm text-neutral-700  leading-relaxed">
        {contentPreview}
      </p>

      {/* Read Time */}
      <div className="pt-3 text-xs text-neutral-500  italic">
        {minutesToRead} min read
      </div>
    </article>
  );
};

export default BlogCard;
