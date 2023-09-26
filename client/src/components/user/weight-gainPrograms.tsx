import React , { useState , useEffect} from 'react'
import { Typography } from '@material-tailwind/react';
import { ProgramApiResponse } from '../../types/courseType';
import { AxiosError } from 'axios';
import { getWeightGainPrograms } from '../../api/endpoints/user';
import { notify,ToastContainer } from '../../utils/notificationUtils';
import ProgramCard from '../common/programCard';
import { Link } from 'react-router-dom';
import ProgramCardShimmer from '../shimmers/programCard';

const WeightGainPrograms : React.FC = () => {
  const [programs,setPrograms] = useState<ProgramApiResponse[]>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeightGainPrograms = async () => {
    try{
      const response = await getWeightGainPrograms()
      setPrograms(response.data?.programs)
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
    fetchWeightGainPrograms()
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
    <div className='flex items-center justify-between px-14 flex-wrap'>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <ProgramCardShimmer />
          </div>
        ))
        ):(
        programs?.map((program) => {
          return (
            <div className='grid md:m-2 w-1/2 md:w-1/4 md:p-2  justify-center overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105' key={program._id}>
              <Link key={program._id} to={`/programs/${program._id}`}>
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


