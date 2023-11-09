import React , { useState , useEffect} from 'react'
import { Typography } from '@material-tailwind/react';
import { ProgramApiResponse } from '../../types/courseType';
import { AxiosError } from 'axios';
import { notify,ToastContainer } from '../../utils/notificationUtils';
import ProgramCard from '../common/programCard';
import { Link } from 'react-router-dom';
import ProgramCardShimmer from '../shimmers/programCard';
import { useDispatch , useSelector } from 'react-redux';
import { selectCourse } from '../../redux/reducers/courseSlice';
import { getAllProgram } from '../../api/endpoints/user';
import { setCourse } from '../../redux/reducers/courseSlice';

const WeightGainPrograms : React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const programs : ProgramApiResponse[] | null = useSelector(selectCourse)

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

  return (
  <>
    <div className=' sm:ml-10 flex items-center justify-start w-full sm:w-9/12 mt-4'>
      <Typography
        variant='h1'
        className='text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold p-2 px-7'
      >
        All Programs
      </Typography>
    </div>
    <div className='grid  py-4 md:grid-cols-3 items-center px-10'>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <ProgramCardShimmer />
          </div>
        ))
        ):(
        programs?.map((program) => {
          return (
            <div className='md:p-3 w-full md:w-full  overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105' key={program._id}>
              <Link key={program._id} to={`/program/${program._id}`}>
                <ProgramCard programInfo={program} />
              </Link>
            </div>
          );
        })
      )}
    </div> 
    <ToastContainer />
  </> 
  )
}

export default WeightGainPrograms;


