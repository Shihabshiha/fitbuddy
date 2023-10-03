import React from 'react'
import { useLocation } from 'react-router-dom'
import { Video } from '../../../types/courseType';
import VideoPlayer from '../../user/videoPlayer';

const VideoPage : React.FC = () =>{

  const location = useLocation();
  const videoData: Video = location.state?.videoData;
  console.log('video data',videoData)
  return (
    <>
    <div className='pt-20 p-4 h-[20rem] w-[20rem]'>
      <VideoPlayer videoData={videoData} />
      
    </div>
    <div>
      <p className='text-bold'>hi this is me </p>
    </div>
    </>
  )

}

export default VideoPage