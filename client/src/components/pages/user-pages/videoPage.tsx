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
    <div className='pt-20 p-4'>
      <VideoPlayer videoData={videoData} />
    </div>
    </>
  )

}

export default VideoPage