const BlogCardSkeleton: React.FC = () => {
  return (
    <article
      className="block w-screen max-w-screen-md mx-auto bg-white  border-b border-neutral-200  rounded-lg shadow-sm p-5 mb-6 animate-pulse"
      aria-label="Loading blog post"
    >
      <header className="flex items-center text-sm text-neutral-600  mb-1 gap-2">
        <div className="w-6 h-6 bg-neutral-300  rounded-full"></div>
        <div className="h-4 bg-neutral-300  rounded w-24"></div>
        <div className="w-1 h-1 bg-neutral-300  rounded-full mx-2"></div>
        <div className="h-4 bg-neutral-300  rounded w-20"></div>
      </header>

      <div className="h-6 bg-neutral-300  rounded w-3/4 mb-2"></div>

 
      <div className="space-y-2 pt-2">
        <div className="h-4 bg-neutral-300  rounded w-full"></div>
        <div className="h-4 bg-neutral-300  rounded w-5/6"></div>
        <div className="h-4 bg-neutral-300  rounded w-4/6"></div>
      </div>

      <div className="pt-3 h-3 bg-neutral-300  rounded w-16"></div>
    </article>
  );
};

export default BlogCardSkeleton;
