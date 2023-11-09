import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import ProgramCard from '../../common/programCard';
import { setCourse } from '../../../redux/reducers/courseSlice';
import ProgramCardShimmer from '../../shimmers/programCard';
import { useDispatch , useSelector } from 'react-redux';
import { selectCourse } from '../../../redux/reducers/courseSlice';
import { ProgramApiResponse } from '../../../types/courseType';
import { getAllProgram } from '../../../api/endpoints/user';
import { AxiosError } from 'axios';
import { notify,ToastContainer } from '../../../utils/notificationUtils';
import { selectIsLoggedIn } from '../../../redux/reducers/userSlice'
import { fetchUserDetails } from '../../../utils/userUtils'

const AllProgramsPage : React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const programs : ProgramApiResponse[] | null = useSelector(selectCourse)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const fetchAllPrograms = async () => {
    try{
      const response = await getAllProgram()
      const course = response.data?.programs
      dispatch(setCourse({course}))
      setIsLoading(false)
    }catch(error:unknown){
      setIsLoading(false)
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred fetching programs.", "error");
      }
    }
  }

  useEffect(()=>{ 
    fetchAllPrograms();
  },[])

  useEffect(()=>{
    if(isLoggedIn){
      fetchUserDetails(dispatch) 
    } 
  },[])

  return (
    <div className='mt-20 lg:px-32 px-8  container'>
      <h1 className='md:text-2xl text-base ml-3 font-semibold mb-3 capitalize'>ALL PROGRAMS</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <ProgramCardShimmer />
          </div>
        ))
        ):(
        programs?.map((program) => {
          return (
            <div className='md:p-3 w-full md:w-full  overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105 ' key={program._id}>
              <Link key={program._id} to={`/program/${program._id}`}>
                <ProgramCard programInfo={program} />
              </Link>
            </div>
          );
        })
      )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default AllProgramsPage;