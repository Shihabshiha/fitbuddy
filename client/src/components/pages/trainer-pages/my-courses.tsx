import React , { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { notify , ToastContainer } from '../../../utils/notificationUtils';
import { AxiosError } from 'axios';
import { getAllCourses } from '../../../api/endpoints/trainer';
import { Course } from '../../../types/courseType';
import CourseTableShimmer from '../../shimmers/course-table-shimmer';
import ListUnlistButton from '../../common/list-unlist-button';



const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [courses,setCourses] = useState<Course[]>([])

  useEffect(()=>{
    setLoading(true)
    const fetchCourses =async () => {
      try{
        const response = await getAllCourses()
        const coursesData = response?.data?.result;
        console.log('courses',coursesData)
        setCourses(coursesData || [])
      }catch(error:unknown){
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("An error occured in fetching trainers data.", "error");
        }
      }finally{
        setLoading(false)
      }
    }
    fetchCourses()
  },[])


  const handleUpdatedCourse = (updatedCourse: Course) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };


  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  return (
    <div>
      {loading && (
        <>
          <CourseTableShimmer />
        </>
      )}

      {!loading && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={()=>{
                navigate('/trainer/add-course')
              }}
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
                    List / Unlist
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <img src={course.thumbnailUrl} alt={course.courseName} className="h-8 w-8" />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">{course.courseName}</td>
                    <td className="px-6 py-4 whitespace-no-wrap ">{formatDate(course.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {/* <button
                        onClick={() => handleListUnlist(course)}
                        className={`${
                          course.isListed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        } text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
                      >
                        {course.isListed ? "Unlist" : "List"}
                      </button> */}
                      <ListUnlistButton course={course} onUpdateCourse={handleUpdatedCourse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <ToastContainer />
      </div>
  );
  
};

export default CoursesTable;

