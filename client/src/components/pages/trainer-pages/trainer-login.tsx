import React , {useState , useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { notify , ToastContainer } from "../../../utils/notificationUtils";
import { loginValidationSchema } from "../../../validations/auth/authValidation";
import { Link , useNavigate  } from "react-router-dom";
import { trainerLogin } from "../../../api/endpoints/auth/trainer-auth";
import { TrainerLoginData } from "../../../types/trainerTypes";
import { AxiosError } from "axios";
import VerificationPendingModal from "../../common/verification-pending-modal";
import { ScaleLoader } from "react-spinners";

const TrainerLogin : React.FC = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const trainerToken = localStorage.getItem("trainerToken");
    if (trainerToken) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);


  const handleLoginSubmit = async (trainerInfo : TrainerLoginData) =>{
    try{
      setLoading(true);
      const response = await trainerLogin(trainerInfo);
      // const trainerDetails = response?.data?.trainer;
      const trainerToken = response?.data?.token;
      if(trainerToken){
        localStorage.setItem("trainerToken",trainerToken)
      }
      setLoading(false);
      notify("Login Success",'success')
      setTimeout(()=>{navigate('/trainer')})
    }catch(error:unknown){
      setLoading(false);
      console.error("Error during login:", error);  
      if (error instanceof AxiosError && error.response?.data?.error) {
        if(error.response.data.error == 'Your account is not yet verified.'){
          setVerificationModalOpen(true);
        }else{
          notify(error.response.data.error, "error");
        }   
      } else {
        notify("An error occurred during login.", "error");
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#007BFF" loading={true} />
      </div>
    );
  } else if (isLoggedIn) {
    navigate("/trainer");
    return null;
  }else{
    return(
      <div className="flex min-h-[75vh] justify-center px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center sm:w-full sm:max-w-md">
          {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
              <ScaleLoader color="#007BFF" loading={true} />
            </div>
            )}
            <div className="mb-6">
              <img
                className="h-16 w-auto"
                src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1691736353/fitbuddy/fitbuddy-high-resolution-logo-color-on-transparent-background_ehho4o.svg"
                alt="Fitbuddy"
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
              Login to Trainer account.
            </h2>
            <div className="mt-10 sm:w-full sm:max-w-xs">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLoginSubmit}
              >
                {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isLoading || isSubmitting}
                    >
                      Log in
                    </button>
                  </div>
                </Form>
               )}
              </Formik>
              <VerificationPendingModal
                isOpen={verificationModalOpen}
                onRequestClose={() => setVerificationModalOpen(false)}
              />
              <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account? 
                <Link
                  to="/trainer/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                > 
                   Register
                </Link>
              </p>
            </div>
          </div>
          <ToastContainer />
        </div>
    )
  }

  
}

export default TrainerLogin