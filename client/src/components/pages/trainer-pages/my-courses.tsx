import React , { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { notify , ToastContainer } from '../../../utils/notificationUtils';
import { AxiosError } from 'axios';
import { getAllCourses } from '../../../api/endpoints/trainer';
import { Course } from '../../../types/courseType';
import TableSkeltonShimmer from '../../shimmers/tableSkelton';
import ListUnlistButton from '../../common/list-unlist-button';
import CourseActionMenu from '../../trainer/course-action-menu';
import DeleteConfirmationModal from '../../modals/course-delete-confirmation';
import ReactPaginate from 'react-paginate';

const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [courses,setCourses] = useState<Course[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage : number = 4; 
  const pageCount : number = Math.ceil(courses.length / itemsPerPage);

  useEffect(()=>{
    setLoading(true)
    const fetchCourses =async () => {
      try{
        const response = await getAllCourses()
        const coursesData = response?.data?.result;
        setCourses(coursesData || [])
      }catch(error:unknown){
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("An error occured in fetching courses.", "error");
        }
      }finally{
        setLoading(false)
      }
    }
    const trainerToken = localStorage.getItem("trainerToken")
    if(trainerToken){
      fetchCourses()
    }
  },[])


  const handleUpdatedCourse = (updatedCourse: Course) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };

  const handleViewCourse = (courseData :Course) => {
    navigate(`/trainer/course/${courseData._id}`,{ state : {course : courseData}})
  }

  const handleDeleteCourse = (courseId:string) => {
    setIsModalOpen(true);
    setCourseIdToDelete(courseId);
  }

  const handleOnDelete = (deletedCourseId:string) => {
    setIsModalOpen(false)
    const updatedCourses = courses.filter((course) => course._id !== deletedCourseId);
    setCourses(updatedCourses);
    setCourseIdToDelete(null)
  }


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCourseIdToDelete(null); 
  };


  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const indexOfLastCourse : number = (currentPage + 1) * itemsPerPage;
  const indexOfFirstCourse: number = indexOfLastCourse - itemsPerPage;
  const currentCourses : Course[] = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  

  return (
    <div >
      <h1 className='text-lg md:text-3xl font-bold'>My Courses</h1>
      {loading && (
        <>
          <TableSkeltonShimmer />
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
              <table className="min-w-full border divide-y divide-gray-200 mb-4">
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
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCourses.map((course) => (
                    <tr key={course._id}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <img src={course.thumbnailUrl} alt={course.courseName} className="h-12 w-12" />
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap ">{course.courseName}</td>
                      <td className="px-6 py-4 whitespace-no-wrap ">{formatDate(course.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <ListUnlistButton course={course} onUpdateCourse={handleUpdatedCourse} />
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <CourseActionMenu
                          onViewClick={() => handleViewCourse(course)}
                          onDeleteClick={() => handleDeleteCourse(course._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          )}
          <ReactPaginate
            previousLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Previous</span>}
            nextLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Next</span>}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex space-x-2"}
            pageClassName={"page"}
            activeClassName={"active"}
          />
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleOnDelete}
        courseIdToDelete={courseIdToDelete}
      />
      
      <ToastContainer />
      </div>
  );
  
};

export default CoursesTable;

