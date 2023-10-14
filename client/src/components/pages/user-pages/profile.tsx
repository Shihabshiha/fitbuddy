import React , {useEffect, useState , useRef} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { selectUser , selectIsLoggedIn } from '../../../redux/reducers/userSlice'
import { USER_AVATHAR } from '../../../constants/common'
import { fetchUserDetails } from '../../../utils/userUtils'
import { getEnrolledPrograms } from '../../../api/endpoints/user'
import { Link } from 'react-router-dom'
import ProgramCard from '../../common/programCard'
import { changeProfileImage } from '../../../api/endpoints/user'
import { ScaleLoader } from 'react-spinners'
import { AxiosError } from 'axios'
import { notify, ToastContainer } from '../../../utils/notificationUtils'
import { ProgramApiResponse } from '../../../types/courseType'

const ProfilePage:React.FC = () => {

  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const [enrolledProgram,setEnrolledProgram] = useState<ProgramApiResponse[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading,setIsLoading] = useState(false)

  const fetchEnrolledPrograms = async()=>{
    if(user.userDetails?._id){
      const response = await getEnrolledPrograms(user.userDetails?._id)
      setEnrolledProgram(response.data?.enrolledPrograms)
    }
  }

  useEffect(()=>{
    if(isLoggedIn){
      fetchUserDetails(dispatch) 
    } 
  },[])

  useEffect(()=>{
    if(isLoggedIn){
      fetchEnrolledPrograms()
    }
  },[user])

  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = async(e:React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    try{
      const selectedFile = e.target.files ? e.target.files[0] : null ;
      if (selectedFile) {
        const formData = new FormData()
        formData.append('profileImage',selectedFile)
        const response = await changeProfileImage(formData)
        setIsLoading(false)
        if(response?.status === 200){
          fetchUserDetails(dispatch);
          notify("Profile Image changed successfully","success")
        }
      }
    }catch(error:unknown){
      setIsLoading(false)
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred during profile image change.", "error");
      }
    }
  }

  return (
    <>
    {isLoading && (
      <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
        <ScaleLoader color="#007BFF" loading={true} />
      </div>
    )}
    <div className='px-10 mt-20'>
      <div className='py-5 border-b'>
        <h1 className='text-2xl md:text-4xl '>Profile Dashboard</h1>
      </div>
      <div className='flex flex-col-2 mt-3'>
        <div className='pl-1'>
          <img 
            src={user.userDetails?.profileImage || USER_AVATHAR}
            alt="Photo"
            className='w-[10rem] h-[10rem] object-cover rounded-full'
          />
        </div>
        <div className='pl-4 flex flex-col justify-center'>
          <span className='text-xl font-semibold'>{user.userDetails?.firstName} {user.userDetails?.lastName}</span>
          <span className='text-base font-medium'>{user.userDetails?.email}</span>
        </div>
      </div>
      <div className='flex mt-4 pl-8'>
        <button 
          className='rounded-lg bg-light-green-600 px-2 py-1 font-semibold mt-2 hover:bg-light-green-800 hover:text-white'
          onClick={handleEditPhoto}
          >Edit photo
        </button>
        <input
          type="file"
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className='mt-10 ml-3 border-t-2'>
        <h2 className='text-3xl mt-3'>Enrolled Programs</h2>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 mt-2 items-center mb-10'> 
        {enrolledProgram && enrolledProgram.map((program)=>{
          return (
            <div className='md:p-3 w-full md:w-full  overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105' key={program._id}>
              <Link key={program._id} to={`/program/${program._id}`}>
                <ProgramCard programInfo={program} />
              </Link>
            </div>
          )
        })
        }
      </div>
     <ToastContainer />
    </div>
    </>
  )
}
export default ProfilePage