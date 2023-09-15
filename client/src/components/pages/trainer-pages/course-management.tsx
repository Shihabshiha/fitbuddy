import React, { useEffect, useState } from 'react';
import { useParams, useNavigate , useLocation } from 'react-router-dom';
import { notify, ToastContainer } from '../../../utils/notificationUtils';
import { AxiosError } from 'axios';
// import { getChaptersByCourseId } from '../../../api/endpoints/chapters'; // You need to implement this API endpoint
import { Chapter } from '../../../types/courseType';
import CourseTableShimmer from '../../shimmers/course-table-shimmer';
import { Button } from "@material-tailwind/react";

const CourseManagement: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state?.course
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]); // Chapter data

  useEffect(() => {
    setLoading(true);
    const fetchChapters = async () => {
      try {
        // Fetch the chapters for the given courseId
        // const response = await getChaptersByCourseId(courseId);
        const chaptersData = response?.data; // Adjust this based on your API response structure
        setChapters(chaptersData || []);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, 'error');
        } else {
          notify('An error occurred in fetching the chapters.', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  const handleAddChapter = () => {
    // Navigate to the page where you can add chapters to this course
    navigate(`/trainer/course/add-chapter/${courseId}`);
  };

  // Render loading state
  if (loading) {
    return <CourseTableShimmer />;
  }

  // Render course details and chapters when chapters data is available
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 mt-2 max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
        <p className="text-gray-700">
          <span className="font-semibold">Course Name:</span> {courseData.courseName}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Description:</span> {courseData.description}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Duration:</span> {courseData.duration} hours
        </p>
        {/* Render other course details here */}
      </div>


      <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
      <Button
        variant="gradient"
        onClick={handleAddChapter}
        color='blue'
        // className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
      >
        Add Chapter
      </Button>

      {/* Render a table to list the chapters if there are chapters */}
      {chapters.length > 0 ? (
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter Name</th>
              {/* Add other table headers */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chapters.map((chapter) => (
              <tr key={chapter._id}>
                <td className="px-6 py-4 whitespace-nowrap">{chapter.caption}</td>
                {/* Add other table cells for chapter details */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (    
        <div className="bg-white border rounded-lg p-8 text-center shadow-inner  mt-4">
          <p className="text-gray-500 text-lg">No Chapters added.</p>
          <p className="text-gray-500 text-lg">Click "Add Chapter" to create a new chapter.</p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CourseManagement;
