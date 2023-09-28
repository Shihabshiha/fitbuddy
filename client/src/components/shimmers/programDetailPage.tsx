import React from 'react';

const ProgramDetailShimmer : React.FC = () => {
  return (
    <div className="grid mt-16 px-5 md:px-20 py-10">
      {/* Header */}
      <div className="grid md:grid-cols-4 grid-flow-row py-5 px-2 gap-3 border-b">
        <div className="md:col-span-3 text-center md:text-start">
          <div className="animate-pulse bg-gray-300 w-32 h-6 rounded"></div>
        </div>
        <div className="md:col-span-1 grid justify-center item-center">
          <button className="animate-pulse bg-gray-300 w-24 h-10 rounded-full"></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 md:gap-20">
        <div className="col-span-1 py-5">
          <div className="bg-blue-gray-50 rounded p-5 animate-pulse">
            <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex items-center text-gray-800 justify-center gap-2">
                <div className="bg-gray-300 w-20 h-4 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex items-center text-gray-800 justify-center gap-2">
                <div className="bg-gray-300 w-16 h-4 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex items-center text-gray-800 justify-center gap-2">
                <div className="bg-gray-300 w-12 h-4 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex py-4 px-5 gap-3 items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex items-center text-gray-800 justify-center gap-2">
                <div className="bg-gray-300 w-8 h-4 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 my-5">
          <div className="block w-full h-[15rem] bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Description and Trainer Info */}
      <div className="grid md:grid-cols-2 mt-5 md:gap-20 gap-5">
        <div className="col-span-1">
          <div className="my-3">
            <div className="bg-gray-300 w-32 h-4 animate-pulse rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-300 h-20"></div>
        </div>
        <div className="col-span-1">
          <div className="my-3">
            <div className="bg-gray-300 w-24 h-4 animate-pulse rounded"></div>
          </div>
          <div className="grid py-3">
            <div className="flex justify-start items-center gap-5">
              <div className="bg-gray-300 w-14 h-14 rounded-full animate-pulse"></div>
              <div className="flex flex-col gp-0">
                <div className="bg-gray-300 w-20 h-4 animate-pulse rounded"></div>
                <div className="bg-gray-300 w-16 h-4 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="grid">
        <div className="mt-5 py-3 border-t border-b px-2">
          <div className="bg-gray-300 w-40 h-4 animate-pulse rounded"></div>
        </div>
        <ul className="mt-5 flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex md:flex-row gap-2 shadow justify-between items-center bg-blue-gray-50 hover:bg-blue-gray-100 rounded px-3 py-2 md:py-5 animate-pulse"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-300 animate-pulse rounded"></div>
              <button className="block text-xs md:text-md font-bold shadow uppercase bg-red-500 text-white rounded border border-red-500 hover:bg-white hover:shadow-md hover:text-red-500 py-2 px-3 animate-pulse">
                Watch Now
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgramDetailShimmer;
