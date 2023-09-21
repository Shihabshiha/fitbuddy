import React, { useEffect , useState } from 'react'
import { getAllCourses } from '../../../api/endpoints/admin'
import { Course } from '../../../types/courseType'
import { AxiosError } from 'axios'
import { notify , ToastContainer } from '../../../utils/notificationUtils'
import TableSkeltonShimmer from '../../shimmers/tableSkelton'
import ListUnlistCourseButton from '../../admin/listUnlist-course'
import ReactPaginate from 'react-paginate'

const AllCoursePage : React.FC = () => {

  const [courses,setCourses] = useState<Course[]>([])
  const [isLoading,setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage : number = 4; 
  const pageCount : number = Math.ceil(courses.length / itemsPerPage);


  useEffect(()=>{
    const fetchAllCourses = async() => {
      try{
        const response = await getAllCourses();
        const courseData = response?.data.result;
        setCourses( courseData || [] )
        setIsLoading(false)
      }catch(error:unknown){
        setIsLoading(false)
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("An error occured in fetching users data.", "error");
        }
      }
    }
    fetchAllCourses()
  },[])

  const handleUpdateCourse = (updatedCourse:Course) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  }

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  
  const currentCourses : Course[] = courses.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">All Courses List</h1>
        {isLoading ? (
          <TableSkeltonShimmer />
        ):(
        <>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sl No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                List / Unlist
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course, index) => {
              // Calculate the correct "Sl No" based on current page and user index
              const slNo = currentPage * itemsPerPage + index + 1;
              return (
                <tr key={course._id}>
                  <td className="px-6 py-4">{slNo}</td>
                  <td className="px-6 py-4">{course.courseName}</td>
                  <td className="px-6 py-4">{course.category}</td>
                  <td className="px-6 py-4">{course.price}</td>
                  <td className="px-6 py-4">
                    <ListUnlistCourseButton course={course} onUpdateCourse={handleUpdateCourse} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Previous</span>}
          nextLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Next</span>}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex space-x-2"}
          activeClassName={"active"}
        />
       </>
        )}
      <ToastContainer />
    </div>
  )
}

export default AllCoursePage