import React, { useEffect , useState , useRef } from "react";
import { BASE_URL, USER_AVATHAR } from "../../../constants/common";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane , faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from "axios";
import { notify , ToastContainer } from "../../../utils/notificationUtils";
import { getAllChatList } from "../../../api/endpoints/user";
import { ChatListItem, TrainerInfoType } from "../../../types/chatType";
import ImagePreviewModal from "../../modals/imagePreviewModal";
import { selectIsLoggedIn  } from "../../../redux/reducers/userSlice";
import { fetchUserDetails } from "../../../utils/userUtils";
import { getChatDetails } from "../../../api/endpoints/user";
import { format } from 'date-fns'
import Lottie from 'lottie-react';
import HandAnimation from '../../common/lottieChatAnimation.json'
import { useDispatch , useSelector } from "react-redux";
import { setMessages , addMessage , selectMessages } from "../../../redux/reducers/chatSlice";
import {io} from 'socket.io-client';



const UserInboxPage: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const [chatLists, setChatLists] = useState<ChatListItem[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [trainerData , setTrainerData] = useState<TrainerInfoType | null>(null)
  const messages = useSelector(selectMessages)
  const [chatId, setChatId] = useState("")


  const  socket = io(BASE_URL)
   

  const fetchChatLists = async() => {
    try{
      const response = await getAllChatList()
      setChatLists(response.data?.chatList)
    }catch(error:unknown){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong", "error");
      }
    }
  }

  useEffect(()=>{
    fetchChatLists() 
  },[])

  useEffect(()=>{
    if(isLoggedIn){
      fetchUserDetails(dispatch) 
    } 
  },[])


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(()=>{
    scrollToBottom();
  },[messages])

  const handleChatSelection = async(chatId:string) => {
    try{
      socket?.emit("join_chat", chatId);
      socket?.on("receive_message", (message)=>{
        if (!messages.some((msg) => msg._id !== message._id)) {
          dispatch(addMessage(message));
        }
      });
      setChatId(chatId);
      const response = await getChatDetails(chatId)
      const allMessages = response?.data?.chats
      dispatch(setMessages(allMessages ?? []))
      setTrainerData(response.data.trainerInfo.participants.trainerId)
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        console.error('errorrr',error)
        notify("something went wrong", "error");
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
  
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
          setModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendImage = async() => {
    if(selectedFile && chatId && socket){
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      const messageData = {
        content : blob,
        sender : 'user',
        messageType: 'image',
        chatId : chatId,
        mimeType: selectedFile.type,
      }
      socket.emit("send_message", messageData)
    }else{
      notify("something went wrong" , "error")
    }
    setModalOpen(false)
  };

  const handleCloseModal = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setModalOpen(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value)
  }

  const handleTextSubmit = async() => {
    const content = textMessage
    try{

      if(chatId && socket){
        const messageData = {
          content : content,
          sender : 'user',
          messageType: 'text',
          chatId : chatId,
        }
        socket?.emit("send_message", messageData)
        setTextMessage('')
      }
    }catch(error){
      setTextMessage('')
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        console.error('error',error)
        notify("something went wrong", "error");
      }
    }
  }


  return (
    <div className="h-[85vh] mt-20 px-20 flex">
      <div className=" w-2/6  border-r border-l ">
        <div className="flex text-2xl h-20 items-center  bg-blue-gray-400 justify-center">
          <h1>Messages</h1>
        </div>
        <div className="grid">
          {chatLists ? (
            chatLists.map((chatList , index)=>{
              return(
                <div className="flex items-center gap-2 p-3 shadow-md hover:cursor-pointer" onClick={()=>handleChatSelection(chatList._id)} key={index}>
                    <img
                      src={USER_AVATHAR}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p className="text-lg">{chatList.participants.trainerId.firstName} {chatList.participants.trainerId.lastName}</p>
                </div>
              )
            })          
          ):(
            <div>
              <h1>No chat list. Start chat now</h1>
            </div>
          )}
        </div>
      </div>
      {messages && chatId ? (
        <div className="grid w-4/6">
          <div className="h-20 bg-blue-gray-300 flex items-center">
            {trainerData && (
              <div className="flex items-center gap-2 ml-2">
                <img
                  src={USER_AVATHAR}
                  alt="img"
                  className="h-12 w-12 object-cover rounded-full"
                />
                <p>{trainerData.firstName} {trainerData.lastName}</p>
              </div>
            )}
          </div>
          <div className="overflow-auto h-[65vh]" ref={chatContainerRef} style={{backgroundImage: 'url("https://res.cloudinary.com/duuwbsmdu/image/upload/v1698410337/fitbuddy/chat_background_qhtowe.jpg")'}}>
            {messages.map((message , index)=>{
              const isUserMessage = message.sender.senderType === 'users';
              const isImageMessage = message.messageType === 'image';
              const utcDate = new Date(message.createdAt)
              const formattedTime = format(utcDate, 'h.mm a');
              return(
                <div key={index} className={`flex p-2 ${isUserMessage ? 'justify-end': ''}`} >
                  
                  {isUserMessage &&(
                    <div className={`bg-${isImageMessage ? 'gray' : 'green-500'} text-white rounded ${isUserMessage ? 'rounded-tr-none' : 'rounded-tl-none'} px-2 py-2 text-end`}>
                      {isImageMessage ? (
                        <img src={message.content} alt="Image" className="w-[80vh] h-[50vh] object-cover rounded" />
                      ) : (
                        <p className="">{message.content}</p>
                      )}
                      <span className="text-blue-gray-100 text-sm font-thin">{formattedTime}</span>
                    </div>
                  )}

                  <span data-icon={isUserMessage ? 'tail-out' : 'tail-in'} className="p0s8B">
                    <svg
                      viewBox="0 0 8 13"
                      height="13"
                      width="8"
                      preserveAspectRatio="xMidYMid meet"
                      className=""
                      version="1.1"
                      x="0px"
                      y="0px"
                      enableBackground="new 0 0 8 13"
                    >
                      <path
                        opacity="0.13"
                        fill={isUserMessage ? '#00a884' : '#374151'}
                        d={isUserMessage ? "M5.188,1H0v11.193l6.467-8.625C7.526,2.156,6.958,1,5.188,1z" : "M1.533,3.568L8,12.193V1H2.812C1.042,1,0.474,2.156,1.533,3.568z"}
                      ></path>
                      <path
                        fill={isUserMessage ? '#00a884' : '#374151'}
                        d={isUserMessage ? "M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z" : "M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"}
                      ></path>
                    </svg>
                  </span>

                  {!isUserMessage && (
                    <div className={`bg-gray-700 rounded ${isUserMessage ? 'rounded-tr-none' : 'rounded-tl-none'} px-2 py-2 text-end`}>
                      {isImageMessage ? (
                        <img src={message.content} alt="Image" className="w-[80vh] h-[50vh] object-cover rounded" />
                      ) : (
                        <p className="text-white">{message.content}</p>
                      )}
                      <span className="text-blue-gray-200 text-sm">{formattedTime}</span>
                    </div>
                  )}
                    
                </div>
              )
            })}
          </div>
          <div className="flex w-full mt-auto mb-1">
            <Input 
              label="Enter message here"
              value={textMessage}
              onChange={handleTextChange}
            />
            <div className=" flex items-center">
              <label htmlFor="fileInput">
                <FontAwesomeIcon icon={faPaperclip} className="text-blue-gray-800 text-xl ml-3 mr-2 hover:cursor-pointer" />
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <FontAwesomeIcon icon={faPaperPlane} className="text-blue-gray-800 text-xl ml-3 mr-2 hover:cursor-pointer" onClick={()=>handleTextSubmit()}/>
            </div>
          </div>
        </div>
      ):(
        <div className='h-[80vh] items-center justify-center'>
          <Lottie
            className=" h-[70vh] ml-28"
            animationData={HandAnimation}
            loop={true}
            autoplay={true}
          />
          <p className="font-semibold text-center ml-24 text-2xl">Start Chat</p>
        </div>
      )}
      <ToastContainer />
      <ImagePreviewModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imagePreview={imagePreview}
        onSend={handleSendImage}
      />

    </div>
  );
};

export default UserInboxPage;
