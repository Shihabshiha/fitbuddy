import React ,{ useEffect , useState } from 'react'
import { USER_AVATHAR } from '../../../constants/common';
import { getAllNotifications } from '../../../api/endpoints/trainer';
import { AxiosError } from 'axios';
import { notify , ToastContainer} from '../../../utils/notificationUtils';
import { NotificationType } from '../../../types/trainerTypes';
import { formatDistanceToNow , parseISO} from 'date-fns';
import NotificationShimmer from '../../shimmers/notification';
import { Input } from '@material-tailwind/react';
import { replayToComment } from '../../../api/endpoints/trainer';
import { PulseLoader } from 'react-spinners';


const NotificationPage : React.FC = () => {

  const [notifications , setNotifications] = useState<NotificationType[]>([])
  const [isLoading , setLoading] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<NotificationType | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplaying , setIsReplaying] = useState(false)

  const fetchNotifications = async() => {
    setLoading(true)
    try{
      const response = await getAllNotifications()
      setNotifications(response.data?.notifications)
      setLoading(false)
    }catch(error){
      setLoading(false)
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong loading notifications.", "error");
      }
    }
  }

  useEffect(()=>{
    fetchNotifications()
  },[])

  const handleReplay = (notification:NotificationType) => {
    setSelectedNotification(notification);
  }

  const sendReply = async() => {
    setIsReplaying(true)
    if (selectedNotification && replyContent) {
    const relatedCommentId = selectedNotification.relatedCommentId;
      try{
        await replayToComment(relatedCommentId,replyContent)
        notify("Replied successfully","success")
        setIsReplaying(false)
        setReplyContent('');
        setSelectedNotification(null);
      }catch(error){
        setIsReplaying(false)
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("something went wrong loading notifications.", "error");
        }
      }
    }else{
      setIsReplaying(false)
    }
  };

  return (
    <>
    <h1 className='text-lg md:text-3xl font-bold mb-5 px-10'>Notifications</h1>
    {isLoading ? (
      <NotificationShimmer itemCount={6} />
    ):(
      <div className='px-10 grid'>
        <div className='border p-2 h-[70vh] overflow-auto'>
          {notifications ? (
            notifications.map((notification , index)=>{
              const dateString = notification.createdAt.toString();
              const createdAtISO = parseISO(dateString);
              const timeAgo = formatDistanceToNow(createdAtISO, { addSuffix: true });
              const isReplayOpen = selectedNotification && selectedNotification._id === notification._id;
              return (
                <div className='mb-6' key={index}>
                  <div className='flex hover:bg-blue-gray-50 hover:cursor-pointer  gap-1' onClick={()=>handleReplay(notification)}>
                    <div> 
                      <img
                      src={notification.userDetails[0].profileImage || USER_AVATHAR } 
                      alt='image'
                      className='w-10 h-10 object-cover rounded-full'
                      />
                    </div>
                    <div className='ml-2 text-sm w-full'>
                      <div className='flex justify-between'>
                        <p className='text-sm'><span className='font-semibold'>{notification.userDetails[0].firstName}{notification.userDetails[0].lastName}</span> commented : "{notification.commentContent}"</p>
                        <p className='text-end'>{timeAgo}</p>
                      </div> 
                      <p>on your video '{notification.videoDetails[0].caption}'</p>
                      {/* {!isReplayOpen ? (
                        <div className='text-end'>
                          <button className='rounded-full hover:bg-gray-700  bg-gray-500 px-2 py-1 text-white'>
                            Replay
                          </button>
                        </div>
                      ):(
                        null
                      )} */}
                    </div>
                  </div>
                  {isReplayOpen && (
                    <div className='flex'>
                      <Input
                        variant='standard'
                        placeholder='add a replay'
                        className='placeholder:italic'
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}

                      />
                      <div className='mt-4 gap-1'>
                        <button 
                          className='rounded-full px-2 bg-green-600 hover:bg-green-700 text-white'
                          onClick={sendReply}
                          disabled={isReplaying}
                        >
                          {isReplaying ? (
                           <PulseLoader size={24} color={'#FFF'} loading={true} className='absolute' />
                          ) : (
                            'Reply'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>      
              )
            })
          ):(
            <div>
              <h1>No Notifications</h1>
            </div>
          )}
        </div>
      </div>
    )} 
    <ToastContainer />
    </>
  )
}

export default NotificationPage;