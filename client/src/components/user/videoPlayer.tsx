import React, { useRef, useEffect , useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { CommentType, Video } from "../../types/courseType";
import { Input } from "@material-tailwind/react";
import { notify } from "../../utils/notificationUtils";
import { postNewComment } from "../../api/endpoints/user";
import { AxiosError } from "axios";
import { useSelector , useDispatch } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import { USER_AVATHAR } from "../../constants/common";
import { fetchUserDetails } from "../../utils/userUtils";
import { selectIsLoggedIn } from "../../redux/reducers/userSlice";
import { formatDistanceToNow , parseISO} from 'date-fns';
import { getAllCommentsById } from "../../api/endpoints/user";




interface VideoPlayerProps {
  videoData: Video;
  markVideoAsWatched: (videoId: string) => void;
}



const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData , markVideoAsWatched }) => {
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<unknown>(null);
  const [isCommenting, setCommenting] = useState(false);
  const [newComment , setNewComment] = useState('')
  const [comments , setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const initializePlayer = () => {
      if (videoRef.current) {
        const options = {
          autoplay: false, // Set to true if you want autoplay
          controls: true, // Show video controls
          sources: [
            {
              src: videoData.videoUrl,
              type: "video/mp4",
            },
          ],
        };

        const player = videojs(
          videoRef.current,
          options,
          function onPlayerReady() {
            let isWatched = false;
            // Player is ready
            player.on("timeupdate",()=>{
              const currentTime = player.currentTime() ?? 0 ;
              const duration = player.duration() ?? 1 ;
              const progressPercentage = (currentTime / duration) * 100;
              if(progressPercentage >= 90 && !isWatched){
                markVideoAsWatched(videoData._id)
                isWatched = true;
              }
            })
          }
        );

        playerRef.current = player;
      }
    };

    // Ensure that the component is mounted before initializing the player
    const timeoutId = setTimeout(initializePlayer, 0);

    return () => {
      if (playerRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (playerRef.current as any).dispose();
      }
      clearTimeout(timeoutId);
    };
  }, [videoData]);

  const fetchCommentsForVideo = async(videoId:string) => {
    try{
      const response = await getAllCommentsById(videoId)
      console.log(response.data.comments)
      setComments(response?.data?.comments)
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error in loading comment.", "error");
      }
    }
  }

  useEffect(()=>{
    if(isLoggedIn) fetchUserDetails(dispatch);
    fetchCommentsForVideo(videoData._id)
  },[newComment])

  const handleCommentFocus = () => {
    console.log('Focused on input');
    setCommenting(true);
  };

  const handleCommentSubmit = async() => {
    try{
      if(newComment.length > 2){
        const videoId = videoData._id;
        const response = await postNewComment(videoId,newComment)
        console.log('comment response',response)
        notify("Comment added successfully", "success")
        setNewComment('')
      }else{
        notify("Enter valid comment","error")
      }
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error in adding comment.", "error");
      }
    }
  }

  const handleCancelClick = () => {
    setCommenting(false); 
    setNewComment('')
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }

  

  return (
    <div className="video-player grid md:flex  ">
      <div data-vjs-player>
        <video ref={videoRef} className="vjs-matrix video-js w-full h-[35vh] md:w-2/3 md:h-[75vh] rounded-xl" />
      </div>
      <div className="w-full md:w-1/3 md:ml-4 overflow-auto h-[75vh]"> 
        <h2 className="text-md font-semibold bg-blue-gray-50 py-2">{videoData.caption}</h2>
        <p>Description : <span className="text-sm md:text-base">{videoData.description}</span></p>
        <div className="mt-3">  
          <p className="mb-3 text-lg">Comments</p>
          <Input 
            variant="standard" 
            placeholder="Add a comment... "
            className="placeholder:italic"
            onFocus={handleCommentFocus}
            value={newComment}
            onChange={handleCommentChange}
          />
          {isCommenting && (
            <div className="flex flex-row justify-end text-sm mt-1 gap-2">
              <button className="hover:bg-blue-gray-200 px-2 py-1 rounded-2xl font-semibold" onClick={handleCancelClick}>
                Cancel
              </button>
              <button
                className="px-2 py-1 rounded-2xl font-semibold hover:bg-blue-gray-200 bg-blue-gray-50"
                onClick={handleCommentSubmit}
              >
                Comment
              </button>
            </div>
          )}
        </div>
        {comments ? (
          (comments.map((comment)=>{
            const dateString = comment.createdAt.toString();
            const createdAtUTC = parseISO(dateString);
            const timeAgo = formatDistanceToNow(createdAtUTC, { addSuffix: true });
            return (
              <div className="mt-5 text-sm font-medium pl-2 flex">
                <div className="grid">
                  <img
                  src={comment.userDetails[0].profileImage || USER_AVATHAR} 
                  alt="" 
                  className="h-10 w-10 object-cover rounded-full"
                  />
                </div>
                <div className="w-4/5 ml-1">
                  <div className="flex gap-2">
                    <p className="font-semibold">@{comment.userDetails[0].firstName}{comment.userDetails[0].lastName}</p>
                    <span className="font-thin">{timeAgo}</span>
                  </div>
                <p className="mt-1 font-mono tracking-normal text-base normal-case">{comment.content}</p> 
                </div>
              </div>
            )
          }))
        ):(
          <>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
