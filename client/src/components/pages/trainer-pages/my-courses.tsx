import React , { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import AddCourseModal from '../../modals/add-course-modal';
import { CourseData } from '../../../types/trainerTypes';
import { addNewCourse } from '../../../api/endpoints/trainer';
import { notify , ToastContainer } from '../../../utils/notificationUtils';
import { AxiosError } from 'axios';
import { ScaleLoader } from 'react-spinners';

interface Course {
  id: number;
  courseName: string;
  createdDate: string;
  subscribers: number;
  chapters: number;
  editLink: string;
  thumbnail: string;
}

const CoursesTable: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading] = useState(false)

  const courses: Course[] = [
    // {
    //   id: 1,
    //   courseName: 'Course 1',
    //   createdDate: '2023-09-01',
    //   subscribers: 50,
    //   chapters: 10,
    //   editLink: '/edit-course/1', // Replace with the actual edit link
    //   thumbnail: 'course1.jpg', // Replace with the actual thumbnail URL
    // },
    // Add more courses as needed
  ];

  const HandleAddCourse = async (newCourse:CourseData) => {
    try{
      setLoading(true);
      const response = await addNewCourse(newCourse)
      setLoading(false)
      console.log(response)
    }catch(error:unknown){
      console.error("Error during registration:", error);
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred during registration.", "error");
      }
    }
  } 

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
          <ScaleLoader color="#007BFF" loading={true} />
        </div>
      )}
      <div className="flex justify-end mb-4">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Course
      </button>

      </div>
      {courses.length === 0 ? (
        <div className="bg-white border rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No courses added.</p>
          <p className="text-gray-500 text-lg">Click "Add Course" to create a new course.</p>
        </div>
      ) : (
        <table className="min-w-full border divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Subscribers
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Chapters/Videos
              </th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <img src={course.thumbnail} alt={course.courseName} className="h-8 w-8" />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap ">{course.courseName}</td>
                <td className="px-6 py-4 whitespace-no-wrap ">{course.createdDate}</td>
                <td className="px-6 py-4 whitespace-no-wrap ">{course.subscribers}</td>
                <td className="px-6 py-4 whitespace-no-wrap ">{course.chapters}</td>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <Link to={course.editLink} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <AddCourseModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAddCourse={HandleAddCourse}
      />
      <ToastContainer />
    </div>
  );
};

export default CoursesTable;
