import React ,{useEffect , useState , useRef} from "react";
import { BASE_URL, USER_AVATHAR } from "../../../constants/common";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { notify , ToastContainer } from "../../../utils/notificationUtils";
import { ChatListItem , UserInfoType } from "../../../types/chatType";
import { getAllChatList  } from "../../../api/endpoints/trainer";
import { getChatDetails } from "../../../api/endpoints/trainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import ImagePreviewModal from "../../modals/imagePreviewModal";
import { format } from 'date-fns'
import {io} from 'socket.io-client';
import { setMessages , addMessage , selectMessages } from "../../../redux/reducers/chatSlice";
import { useDispatch , useSelector } from "react-redux";

const InboxPage: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [chatLists, setChatLists] = useState<ChatListItem[]>([])
  const [textMessage, setTextMessage] = useState('');
  const [chatId, setChatId] = useState("")
  const [userInfo , setUserInfo] = useState<UserInfoType | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)


  const  socket = io(BASE_URL)
 

  const fetchChatList = async() => {
    try{
      const response = await getAllChatList()
      setChatLists(response.data.chatList)
    }catch(error:unknown){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong", "error");
      }
    }
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(()=>{
    scrollToBottom();
  },[messages])

  useEffect(() => { fetchChatList()}, [])
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value)
  }

  const handleTextSubmit = async() => {
    const content = textMessage;
    try{
      if(chatId && socket){
        const messageData = {
          content : content,
          sender : 'trainer',
          messageType: 'text',
          chatId : chatId,
        }
        socket.emit("send_message", messageData)
        setTextMessage('')
      }
    }catch(error:unknown){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong", "error");
      }
    }
  }


  const handleChatSelection = async (chatId: string) =>{
    socket.emit("join_chat", chatId);
    socket.on("receive_message", (message)=>{
      console.log("incoming messagr",message)
      if (!messages.some((msg) => msg._id !== message._id)) {
        dispatch(addMessage(message));
      }
    });
    setChatId(chatId);
    const response = await getChatDetails(chatId);
    setUserInfo(response.data?.userInfo.participants.userId)
    dispatch(setMessages(response.data?.chats ?? []));
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
        sender : 'trainer',
        messageType: 'image',
        chatId : chatId,
        mimeType: selectedFile.type,
      }
      socket.emit("send_message", messageData)
    }else{
      notify("something went wrong" , "error")
    }
    setModalOpen(false)
  }

  const handleCloseModal = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setModalOpen(false);
  };


  return (
    <div className="container w-full h-full">
      <div className="flex h-16">
        <div className="bg-custom-deeper-chat w-1/4 flex items-center text-2xl pl-4 font-semibold border-r">
          <h1 className="text-white">Messages</h1>
        </div>
        {userInfo && (
          <div className="flex w-3/4 items-center pl-2 bg-custom-deeper-chat">
            <img
              src={userInfo.profileImage || USER_AVATHAR}
              alt="img"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <p className="text-lg font-sans text-white">{userInfo.firstName} {userInfo.lastName}</p>
          </div>
        )}
      </div>
      <div className="flex">
        <div className="w-1/4 h-[72vh] bg-custom-chat border-r-2">
          {chatLists ? (
            chatLists.map((chatList , index)=>{
              return (
                <div key={index} className="flex items-center p-2  hover:bg-blue-gray-50 border-b text-white hover:text-black hover:cursor-pointer" onClick={()=>handleChatSelection(chatList._id)}>
                  <img
                    src={chatList.participants.userId.profileImage||USER_AVATHAR}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <p className="ml-2  font-semibold">{chatList.participants.userId.firstName}{chatList.participants.userId.lastName}</p>
                </div>
              )
            })
          ):(
            <div>
              <h1>No chat list</h1>
            </div>
          )} 
        </div>
        {messages.length > 0 && chatId ? (

          <div ref={chatContainerRef} className="w-3/4 h-[72vh] bg-blue-gray-50 overflow-auto">
            {messages?.map((message , index)=>{
                const isTrainerMessage = message.sender.senderType === 'trainers';
                const isImageMessage = message.messageType === 'image';
                const utcDate = new Date(message.createdAt)
                const formattedTime = format(utcDate, 'h.mm a');
                return (
                  <div key={index} className={`grid p-2 ${isTrainerMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex">
                      {isTrainerMessage && (
                        <div className={`bg-${isTrainerMessage ? 'green-500' : 'gray-700'} text-white rounded ${isTrainerMessage ? 'rounded-tr-none' : 'rounded-tl-none'} px-2 py-2 text-end`}>
                          {isImageMessage ? (
                            <img 
                              src={message.content} 
                              alt="Image"
                              className="w-[70vh] h-[50vh] object-cover rounded"
                            />
                          ) : (
                            <p className={isTrainerMessage ? '' : 'text-white'}>{message.content}</p>
                          )}
                          <span className={`text-${isTrainerMessage ? 'blue-gray-100' : 'blue-gray-200'} text-sm`}>{formattedTime}</span>
                        </div>
                      )}
                
                      <span data-icon={isTrainerMessage ? 'tail-out' : 'tail-in'} className="p0s8B">
                        <svg
                          viewBox="0 0 8 13"
                          height="13"
                          width="8"
                          preserveAspectRatio="xMidYMid meet"
                          className={`text-${isTrainerMessage ? 'gray' : 'gray-700'}`}
                          version="1.1"
                          x="0px"
                          y="0px"
                          enableBackground="new 0 0 8 13"
                        >
                          <path
                            opacity="0.13"
                            fill={isTrainerMessage ? '#00a884' : '#0000000'}
                            d={isTrainerMessage ? "M5.188,1H0v11.193l6.467-8.625C7.526,2.156,6.958,1,5.188,1z" : "M1.533,3.568L8,12.193V1H2.812C1.042,1,0.474,2.156,1.533,3.568z"}
                          ></path>
                          <path
                            fill={isTrainerMessage ? '#00a884' : 'currentColor'}
                            d={isTrainerMessage ? "M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z" : "M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"}
                          ></path>
                        </svg>
                      </span>
                
                      {!isTrainerMessage && (
                        <div className={`bg-${isTrainerMessage ? 'custom-chat-msg-right' : 'gray-700'} text-white rounded ${isTrainerMessage ? 'rounded-tr-none' : 'rounded-tl-none'} px-2 py-2 text-end`}>
                          {isImageMessage ? (
                            <img 
                              src={message.content} 
                              alt="Image" 
                              className="w-[70vh] h-[50vh] object-cover rounded"
                            />
                          ) : (
                            <p className={isTrainerMessage ? '' : 'text-white'}>{message.content}</p>
                          )}
                          <span className={`text-${isTrainerMessage ? 'blue-gray-100' : 'blue-gray-200'} text-sm`}>{formattedTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );           
            })}
          </div>
        ):(
          <div className="flex justify-center items-center w-3/4">
            <h1 className="text-3xl font-semibold">Start chat</h1>
          </div>
        )}
      </div>
      {chatId && messages && (
        <div className="mt-1 ml-64 pl-3 flex items-center">
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
          <input 
            type="text" 
            placeholder="Enter your message" 
            className="bg-white rounded px-2 py-1 w-full" 
            value={textMessage}
            onChange={handleTextChange}
          />
          <PaperAirplaneIcon className="h-8 w-8 text-gray-500 hover:cursor-pointer" onClick={()=>handleTextSubmit()}/>
        </div>
      )}
      <ImagePreviewModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imagePreview={imagePreview}
        onSend={handleSendImage}
      />
      <ToastContainer />
    </div>
  );
};

export default InboxPage;
