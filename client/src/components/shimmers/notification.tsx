import React from 'react';

interface ShimmerListProps {
  itemCount: number;
}

const NotificationShimmer: React.FC<ShimmerListProps> = ({ itemCount }) => {
  // Generate an array of item keys based on the itemCount
  const itemKeys = Array.from({ length: itemCount }, (_, index) => index);

  return (
    
    <div>
      {itemKeys.map((itemKey) => (
        <div key={itemKey} className="flex mt-3  hover:cursor-pointer gap-1">
          <div className="animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          <div className="ml-2 text-sm w-full h-full">
            <div className="animate-pulse h-full w-full">
              <p className="text-sm font-semibold bg-gray-300  w-32 h-4"></p>
              <p className="bg-gray-300 w-40 h-4 "></p>
              <p className="bg-gray-300 w-24 h-4 "></p>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default NotificationShimmer;
