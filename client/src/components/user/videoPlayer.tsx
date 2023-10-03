import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Video } from '../../types/courseType';

interface VideoPlayerProps {
  videoData: Video;
}



const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<never>();

  useEffect(() => {
    const initializePlayer = () => {
      if (videoRef.current) {
        const options = {
          autoplay: false, // Set to true if you want autoplay
          controls: true, // Show video controls
          sources: [
            {
              src: videoData.videoUrl,
              type: 'video/mp4',
            },
          ],
        };

        const player = videojs(videoRef.current, options, function onPlayerReady() {
          // Player is ready
        });

        playerRef.current = player;
      }
    };

    // Ensure that the component is mounted before initializing the player
    const timeoutId = setTimeout(initializePlayer, 0);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      clearTimeout(timeoutId);
    };
  }, [videoData]);


  return (
    <div className="video-player">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js" />
      </div>
      <h1>{videoData.caption}</h1>
      <h2>{videoData.description}</h2>
    </div>
  );
};

export default VideoPlayer;
