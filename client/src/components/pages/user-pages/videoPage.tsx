import React from 'react'
import { useLocation } from 'react-router-dom'
import { Video } from '../../../types/courseType';
import VideoPlayer from '../../user/videoPlayer';
import { markVideoAsWatched } from '../../../api/endpoints/user';
import { AxiosError } from 'axios';
import { notify , ToastContainer } from '../../../utils/notificationUtils';


const VideoPage : React.FC = () =>{

  const location = useLocation();
  const videoData: Video = location.state?.videoData;

  const markVideoAsWatchedById = async(videoId:string) => {
    try{
      console.log('watch progress called')
      console.log('videos id',videoId)
      const response = await markVideoAsWatched(videoId);
      console.log(response)
      notify("Video is marked as watched"," success")
    }catch(error:unknown){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        console.error('Error occured :',error)
        notify("An error occurred in marking video as watched.", "error");
      }
    }
  }
  
  return (
    <>
    <div className='pt-20 p-4'>
      <VideoPlayer videoData={videoData} markVideoAsWatched={markVideoAsWatchedById} />
    </div>
    <ToastContainer />
    </>
  )

}

export default VideoPage