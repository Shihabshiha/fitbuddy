import React , { useEffect , useState } from 'react'
import { Select, Option , Progress  } from "@material-tailwind/react";
import { getProgramProgress } from '../../api/endpoints/user';
import { AxiosError } from 'axios';
 import { notify,ToastContainer } from '../../utils/notificationUtils';
 import { ProgramProgress } from '../../types/courseType';
import { Link } from 'react-router-dom';
const  MyPrograms : React.FC = () => {

  const [programs , setPrograms] = useState<ProgramProgress[]>([])

  const fetchProgramProgress = async() => {
    try{
      const response = await getProgramProgress()
      const programDetails = response.data?.programProgress;
      console.log(response.data.programProgress)
      setPrograms(programDetails)
    }catch(error:unknown){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred in marking video as watched.", "error");
      }
    }
  }

  useEffect(()=>{
      fetchProgramProgress()
  },[])

  return (
    <>
    <div className="w-3 mr-52">
      <Select size="md" label="My programs">  
        {programs && 
          programs.map((program , index)=>{
            return (          
              <Link to={`/program/${program.programId}`} key={index}>
                <Option key={program.programId}>{program.programName} 
                <div className='mb-1 flex items-center justify-between text-sm '>
                  <span>Completed</span>
                  <span>{program.progress}%</span>  
                </div>
                <Progress value={program.progress} size='sm'/>
                </Option>
              </Link>
            )
          })
        }  
      </Select>
    </div>
    <ToastContainer />
    </>
  );
}

export default MyPrograms