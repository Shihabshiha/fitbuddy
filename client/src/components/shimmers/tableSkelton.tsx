import React from 'react';

const TableSkeltonShimmer: React.FC = () => {
  // Define the number of shimmer rows you want
  const shimmerRows = [1, 2, 3, 4, 5]; // You can adjust the number of rows as needed

  return (
    <table className="min-w-full border divide-y divide-gray-200">
    <tbody className="bg-white divide-y divide-gray-200">
      {shimmerRows.map((row) => (
        <tr key={row}>
          <td className="px-6 py-4 whitespace-no-wrap animate-pulse">
            <div className="bg-gray-300 h-8 w-8 rounded-md"></div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap animate-pulse">
            <div className="bg-gray-300 h-5 w-4/5 rounded-md"></div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap animate-pulse">
            <div className="bg-gray-300 h-5 w-4/5 rounded-md"></div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap animate-pulse">
            <div className="bg-gray-300 h-8 w-20 rounded-md"></div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
  );
};

export default TableSkeltonShimmer;
