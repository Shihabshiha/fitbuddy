

import React from 'react';

const ProgramCardShimmer: React.FC = () => {
  return (
    <div className='w-[20rem] h-[25rem] p-5 overflow-hidden hover:shadow-md hover:border animate-pulse'>
      <div className='relative h-[200px]'>
        <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-full w-full rounded'></div>
      </div>
      <div className='p-2'>
        <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-6 w-2/3 mb-2 rounded'></div>
        <div className='space-y-2'>
          <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-full rounded'></div>
          <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-full rounded'></div>
        </div>
        <div className='mt-4 flex justify-between items-center'>
          <div className='group'>
            <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-1/4 rounded'></div>
          </div>
          <div className='flex items-center gap-1.5'>
            <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-6 rounded'></div>
            <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-8 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCardShimmer;
