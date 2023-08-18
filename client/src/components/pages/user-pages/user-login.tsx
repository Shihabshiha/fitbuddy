import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState , useEffect } from "react";
import { UserLoginData } from "../../../types/userType";
import { loginUser } from "../../../api/endpoints/auth/user-auth";
import { notify , ToastContainer } from "../../../utils/notificationUtils";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../../../validations/auth/authValidation";
import { setUser } from "../../../redux/reducers/userSlice";


const UserLoginPage : React.FC = () =>{

  const dispatch = useDispatch()
  const [isLoggedIn , setIsLoggedIn] = useState<boolean>()
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  const loginCheck = (): void => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };

  useEffect(()=>{
    loginCheck()
  })

  const handleLoginSubmit = async (userInfo: UserLoginData) =>{
    try{
        const response = await loginUser(userInfo);
        const userDetails = response?.data.user 
        if(userDetails){
          localStorage.setItem("userToken",response.data.token)
        }
        notify("Login Success",'success')
        dispatch(setUser(userDetails))
        setTimeout(()=>{
          navigate('/')
        },1500)
    }catch(error:unknown){
      notify(error.response?.data?.error, "error");
      console.error(error);
    }
  }

  if(isLoggedIn){
    navigate('/')
  }else{
    return (
      <div className="flex min-h-[75vh] justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center sm:w-full sm:max-w-md">
          <div className="mb-6">
            <img
              className="h-16 w-auto"
              src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1691736353/fitbuddy/fitbuddy-high-resolution-logo-color-on-transparent-background_ehho4o.svg"
              alt="Fitbuddy"
            />
          </div>
          <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
            Login to your account.
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
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            </Formik>
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }

}

export default UserLoginPage