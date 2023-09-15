// ListUnlistButton.tsx
import { BeatLoader } from 'react-spinners';
import React, { useState } from 'react';
import { listUnlist } from '../../api/endpoints/trainer';
import { Course } from '../../types/courseType';

interface ListUnlistButtonProps {
  course: Course;
  onUpdateCourse: (updatedCourse: Course) => void;
}

const ListUnlistButton: React.FC<ListUnlistButtonProps> = ({ course, onUpdateCourse }) => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const updatedCourse = await listUnlist(course._id, !course.isListed)

      // Call the onUpdateCourse callback to update the course in the parent component
      onUpdateCourse(updatedCourse.data);

      setLoading(false);
    } catch (error) {
      // Handle API call errors
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : course.isListed
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-600'
      } text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
      disabled={loading}
    >
      {loading ? <BeatLoader size={8} color="white" /> : course.isListed ? 'Unlist' : 'List'}
    </button>
  );
};

export default ListUnlistButton;
