import React, { useEffect, useState } from 'react';
import { useParams, useNavigate , useLocation } from 'react-router-dom';
import { notify, ToastContainer } from '../../../utils/notificationUtils';
import { AxiosError } from 'axios';
import { getChaptersByCourseId } from '../../../api/endpoints/trainer';
import { Chapter } from '../../../types/courseType';
import CourseTableShimmer from '../../shimmers/course-table-shimmer';
import { Button } from "@material-tailwind/react";

const CourseManagement: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state?.course
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]); 

  useEffect(() => {
    setLoading(true);
    const fetchChapters = async () => {
      try {
        if(courseId){
          const response = await getChaptersByCourseId(courseId);
          const chaptersData = response?.data.result; 
          console.log('chapter data',chaptersData)
          setChapters(chaptersData || []);
        }
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
    navigate(`/trainer/course/add-chapter/${courseId}`);
  };

  // Render loading state
  if (loading) {
    return <CourseTableShimmer />;
  }

  // Render course details and chapters when chapters data is available
  return (
    <div className="container mx-auto p-3">
      <div className="bg-white p-4 rounded-lg shadow-md mb-2 mt-2 max-w-sm">
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

      {chapters.length > 0 ? (
        <table className="min-w-full border divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caption</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chapters.map((chapter, index) => (
              <tr key={chapter._id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chapter.caption}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    onClick={handleAddChapter}
                    color='red'
                  >
                    Delete
                  </Button>
                </td>   
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
