import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-neutral-800/40 rounded-xl overflow-hidden border border-neutral-700/80 shadow-lg">
      <div className="w-full h-56 bg-neutral-700 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-neutral-700 rounded-md animate-pulse mb-4"></div>
        <div className="h-4 w-1/2 bg-neutral-700 rounded-md animate-pulse mb-6"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 w-1/3 bg-neutral-700 rounded-md animate-pulse"></div>
          <div className="h-10 w-1/4 bg-neutral-700 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

