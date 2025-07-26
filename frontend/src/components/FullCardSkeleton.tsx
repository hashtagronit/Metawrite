const FullCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white  shadow-md rounded-xl p-6">
    <div className="bg-white  shadow-md rounded-xl p-6 animate-pulse">
      
      <div className="h-8 bg-neutral-300 text-3xl rounded w-3/4 mb-4"></div>

    
      <div className="h-4 bg-neutral-300  rounded w-1/2 mb-6"></div>

     
      <div className="space-y-3">
        <div className="h-4 bg-neutral-300  rounded w-full"></div>
        <div className="h-4 bg-neutral-300  rounded w-5/6"></div>
        <div className="h-4 bg-neutral-300  rounded w-3/4"></div>
        <div className="h-4 bg-neutral-300  rounded w-full"></div>
        <div className="h-4 bg-neutral-300  rounded w-4/5"></div>
      </div>
    </div>
    </div>
  );
};

export default FullCardSkeleton;
