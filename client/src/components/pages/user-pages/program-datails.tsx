import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { notify, ToastContainer } from "../../../utils/notificationUtils";
import { USER_AVATHAR } from "../../../constants/common";
import { getProgramDetailById } from "../../../api/endpoints/user";
import ProgramDetailShimmer from "../../shimmers/programDetailPage";
import { ProgramDetailInterface } from "../../../types/courseType";
import { enrollCheckout } from "../../../api/endpoints/user";
import LoginRequiredModal from "../../modals/loginRequiredModal";
import { useSelector } from "react-redux";
import { selectUser , enrollProgram } from "../../../redux/reducers/userSlice";
import PaymentStatusModal from "../../modals/paymentStatusModal";
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from "../../../utils/userUtils";
import { selectIsLoggedIn } from "../../../redux/reducers/userSlice";
import { Video } from "../../../types/courseType";

const ProgramDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const programId: string | undefined = params?.programId;
  const [program, setProgram] = useState<ProgramDetailInterface>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage , setModalMessage] = useState<string>('');
  const [isEnrolling , setIsEnrolling] = useState(false);
  const [isPaymentStatusModal , setIsPaymentStatusModal] = useState(false);
  const [paymentModalMessage , setPaymentModalMessage ] = useState('')
  const user = useSelector(selectUser);
  console.log('userr',user)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn)

  // const enrolledPrograms = user?.userDetails?.enrolledPrograms;
  // const isEnrolled = enrolledPrograms?.includes(programId)

  const isEnrolled =
  user?.userDetails?.enrolledPrograms && programId
    ? user.userDetails.enrolledPrograms.includes(programId)
    : false;



  const fetchProgramDetails = async (programId: string) => {
    try {
      const response = await getProgramDetailById(programId);
      setProgram(response.data.program);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred fetching programs.", "error");
      }
    }
  };

  useEffect(() => {
    if(isLoggedIn) fetchUserDetails(dispatch); 
    window.scrollTo(0, 0);
    if (programId !== undefined) {
      fetchProgramDetails(programId);
    }
  }, [programId, dispatch , isLoggedIn]);

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const resultParam = urlParams.get("result")
    const programId = urlParams.get("courseId")
    if (resultParam === 'success') {
      if(programId) dispatch(enrollProgram(programId))
      setIsPaymentStatusModal(true);
      setPaymentModalMessage('success');
    } else if (resultParam === 'cancel') {
      setIsPaymentStatusModal(true);
      setPaymentModalMessage('canceled');
    }
  },[])

  const handleEnroll = async() =>{
    try{   
      if(programId !== undefined){
        setIsEnrolling(true)
        const response = await enrollCheckout(programId);
        const redirectUrl = response.data?.url;
        if(redirectUrl){
          window.location.href = redirectUrl;
        }
      }   
    }catch(error:unknown){
      if (error instanceof AxiosError && error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage === "Authentication required") {
          setIsModalOpen(true);
          setModalMessage("For enrolling in the program, you need to log in first.");
        }  else if (errorMessage === "Token has expired") {
          setIsModalOpen(true);
          setModalMessage("Your session has expired. Please log in again.")
        } else {
          notify(errorMessage, "error");
        }
        
      } else {
        notify("An error occurred fetching programs.","error");
      }
    }
  }

  const closeModal = () =>{
    setIsModalOpen(false)
    setIsEnrolling(false)
  }

  const closePaymentStatusModal = () => {
    setIsPaymentStatusModal(false)
  }

  const handleWatchClick = (videoData : Video, index:number) =>{
    navigate(`/program/video/${index}`,{ state : { videoData } })
  }

  return (
    <>
      {isLoading ? (
        <ProgramDetailShimmer />
      ) : (
        program ? (

        <div className="grid mt-16 px-5 md:px-20 py-10">
          <div className="grid md:grid-cols-4 grid-flow-row py-5 px-2 gap-3 border-b">
            <div className="md:col-span-3 text-center md:text-start">
              <h1 className="text-3xl font-bold">{program?.courseName}</h1>
            </div>
            <div className="md:col-span-1 grid justify-center item-center">
            {isEnrolling ? (
              <button
                className="bg-light-green-700 border border-light-green-700 hover:bg-white hover:text-light-green-700 py-1 px-8 rounded font-semibold uppercase text-white shadow-lg"
              >
                Loading..
              </button>
            ) : isEnrolled ? (
              <p className="font-semibold text-white rounded bg-light-green-700 hover:text-light-green-800 px-4 py-2 hover:shadow-md hover:bg-white">
                Enrolled
              </p>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-light-green-700 border border-light-green-700 hover:bg-white hover:text-light-green-700 py-1 px-8 rounded font-semibold uppercase text-white shadow-lg"
              >
                Enroll
              </button>
            )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-20">
            <div className="col-span-1 py-5">
              <div className="bg-blue-gray-50 rounded">
                <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
                  <div className="w-6">
                    <svg
                      stroke="green"
                      stroke-width="1.5"
                      fill="green"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center text-gray-800 justify-center gap-2">
                    <p className="text-lg font-sans">Enrolled :</p>
                    <p className="text-sm">{program?.enrollmentCount} fellows</p>
                  </div>
                </div>
                <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
                  <div className="w-6">
                    <svg
                      stroke="blue"
                      fill="blue"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center text-gray-800 justify-center gap-2">
                    <p className="text-lg font-sans">Duration :</p>
                    <p className="text-sm">{program?.duration} hours</p>
                  </div>
                </div>
                <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
                  <div className="w-6">
                    <svg
                      fill="red"
                      stroke="red"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center text-gray-800 justify-center gap-2">
                    <p className="text-lg font-sans">Videos :</p>
                    <p className="text-sm">{program?.videos.length}</p>
                  </div>
                </div>

                <div className="flex border-b border-blue-gray-100 py-4 px-5 gap-3 items-center">
                  <div className="w-6">
                    <svg
                      fill="orange"
                      stroke="orange"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center text-gray-800 justify-center gap-2">
                    <p className="text-lg font-sans">Level :</p>
                    <p className="text-sm">{program?.level}</p>
                  </div>
                </div>
                <div className="flex py-4 px-5 gap-3 items-center">
                  <div className="w-7">
                    <svg
                      fill="black"
                      stroke="white"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center text-gray-800 justify-center gap-2">
                    <p className="text-lg font-sans font-bold">Price :</p>
                    {program?.price === 0 ? (
                      <p className="text-lg font-semibold text-red-600 uppercase">Free</p>
                    ) : (
                      <p className="text-lg font-semibold">{program?.price}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 my-5">
              <div className="block w-full h-[20rem]">
                <img
                  src={program?.thumbnailUrl}
                  alt="program"
                  className="h-full w-full object-cover rounded"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 mt-5 md:gap-20 gap-5">
            <div className="col-span-1 ">
              <div className="my-3">
                <h2 className="text-xl text-gray-900 font-bold uppercase">
                  About the program
                </h2>
              </div>
              <div>
                <p className="font-sans">{program?.about}</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="my-3">
                <h2 className="text-xl text-gray-900 font-bold uppercase">
                  trainer info
                </h2>
                <div className="grid py-3">
                  <div className="flex justify-start items-center gap-5">
                    <div className="block w-14 h-14">
                      <img
                        src={
                          program?.trainerDetails?.profileUrl || USER_AVATHAR
                        }
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gp-0">
                      <h5 className="text-lg capitalize font-semibold">
                        {`${program?.trainerDetails.firstName} ${program?.trainerDetails.lastName}`}
                      </h5>
                      <span className="text-sm capitalize">
                        fitness influencer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-span-1 my-6">
            <div className="my-2">
              <h2 className="text-xl text-gray-900 font-bold uppercase">
                Description
              </h2>
            </div>
            <div>
              <p>{program?.description}</p>
            </div>
          </div> */}
          <div className="grid">
            <div className=" mt-5 py-3 border-t border-b px-2">
              <h2 className="text-2xl text-gray-900 font-bold uppercase">
                Explore the Videos
              </h2>
            </div>
            <ul className="mt-5 flex flex-col gap-2">
              {program?.videos.map((video, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row gap-2 shadow justify-between items-center bg-blue-gray-50 hover:bg-blue-gray-100 rounded px-3 py-2 md:py-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="cursor-pointer">
                        <h1 className="text-xl font-bold">{index + 1}.</h1>
                      </div>
                      <div className="cursor-pointer">
                        <h4 className="text-sm md:text-xl font-medium">{video.caption}</h4>
                      </div>
                    </div>
                    {isEnrolled ? (
                      <button onClick={()=> handleWatchClick(video,index+1)} className="block text-xs md:text-md font-bold shadow uppercase bg-red-500 text-white rounded border border-red-500 hover:bg-white hover:shadow-md hover:text-red-500 py-2 px-3">
                        Watch Now
                      </button>
                    ) : (
                      <span className="text-xs md:text-base font-medium capitalize bg-red-600 text-white rounded border py-2 px-3">
                        Enroll to watch videos
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        ):(
          <div className="text-center py-10 text-gray-800 mt-52">
            <p className="text-2xl font-bold">Program Not Found ,go back to home !!</p>
          </div>
        )
      )}
      <ToastContainer />
      <LoginRequiredModal isOpen={isModalOpen} onRequestClose={closeModal} message={modalMessage} />
      <PaymentStatusModal isOpen={isPaymentStatusModal} onClose={closePaymentStatusModal} message={paymentModalMessage} />
    </>
  );
};

export default ProgramDetailPage;
