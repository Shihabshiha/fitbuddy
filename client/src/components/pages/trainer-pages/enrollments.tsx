import React , { useEffect , useState } from 'react'
import { notify, ToastContainer } from '../../../utils/notificationUtils';
import { AxiosError } from 'axios';
import { getAllEnrollments } from '../../../api/endpoints/trainer';
import { enrollmentTableType } from '../../../types/trainerTypes';
import ReactPaginate from 'react-paginate';

const EnrollmentsPage : React.FC = () => {

  const [enrollments , setEnrollments] = useState<enrollmentTableType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage : number = 4; 
  const pageCount : number = Math.ceil(enrollments.length / itemsPerPage);

  const fetchEnrollemtdata = async() => {
    try{
      const response = await getAllEnrollments()
      setEnrollments(response.data?.enrollments)
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong loading notifications.", "error");
      }
    }
  }

  useEffect(()=>{
    fetchEnrollemtdata()
  },[])

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const indexOfLastEnrollment : number = (currentPage + 1) * itemsPerPage;
  const indexOfFirstEnrollment: number = indexOfLastEnrollment - itemsPerPage;
  const currentEnrollment : enrollmentTableType[] = enrollments.slice(indexOfFirstEnrollment, indexOfLastEnrollment);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <h1 className='text-lg md:text-3xl font-bold mb-5 px-1  '>Enrollments</h1>
      <div>
        <table className='min-w-full divide-y border divide-gray-200 mb-4'>
          <thead>
            <tr>
              <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                Sl.No
              </th>
              <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                Enrolled Person
              </th>
              <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                Course Name
              </th>
              <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                Amount
              </th>
              <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                Enrolled date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEnrollment.map((enrollment , index)=>(
              <tr key={enrollment._id}>
                <td className='px-6 py-3 whitespace-no-wrap'>
                  {index+1}
                </td>
                <td className='px-6 py-3 whitespace-no-wrap'>
                  {enrollment.enrolledPersonName}
                </td>
                <td className='px-6 py-3 whitespace-no-wrap'>
                  {enrollment.programName} 
                </td>
                <td className='px-6 py-3 whitespace-no-wrap'>
                  {enrollment.payment.amount}
                </td>
                <td className='px-6 py-3 whitespace-no-wrap'>
                  {formatDate(enrollment.payment.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Prev</span>}
        nextLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Next</span>}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination flex space-x-2"}
        pageClassName={"page"}
        activeClassName={"active"}
      />
      <ToastContainer />
    </div>
  )
}

export default EnrollmentsPage