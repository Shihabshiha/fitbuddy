import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { AxiosError } from "axios";
import { notify, ToastContainer } from "../../utils/notificationUtils";
import { googleLogin } from "../../api/endpoints/auth/user-auth";
import { setUser } from "../../redux/reducers/userSlice";
import React ,{ useState } from "react";
import { ScaleLoader } from "react-spinners";


const GoogleAuthComponent :  React.FC = () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const errorMessage = ():void => {
    toast.error("error from google login"),{
      position : toast.POSITION.TOP_RIGHT
    }
  }

  const handleSignInWithGoogle = async (credential : string) =>{
    try{
      setLoading(true)
      const response = await googleLogin(credential)
      const userDetails = response?.data.user
      if(userDetails){
        localStorage.setItem("userToken",response.data.token)
      }
      notify("Login Success",'success')
      dispatch(setUser(userDetails))
      setLoading(false)
      setTimeout(()=>{
        navigate('/')
      },1500)

    }catch(error:unknown){
      setLoading(false)
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred during verification.", "error");
      }
    }
  }



  return (
    
    <div className='mb-5 '>
      <div className="flex justify-center">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
          <ScaleLoader color="#007BFF" loading={true} />
        </div>
      )}
      <GoogleLogin
        width="280px" 
        size='large'
        // theme="filled_blue"
        logo_alignment="center"
        shape="pill"
        auto_select={false}
        type="standard"
        ux_mode="popup"
          onSuccess={(response) => {
            if (response) {
              handleSignInWithGoogle(response.credential ?? "empty response");
            }
          }}
          onError={errorMessage}
        />
      </div>
      <ToastContainer />
    </div>
  );
} 

export default GoogleAuthComponent