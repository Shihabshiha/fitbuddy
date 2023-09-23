import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { adminLogin} from "../../../api/endpoints/auth/admin-auth";
import { AdminLoginData } from "../../../types/adminTypes";
import { notify , ToastContainer } from "../../../utils/notificationUtils";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../../validations/auth/authValidation";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/reducers/adminAuthSlice";

const AdminLoginPage : React.FC = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLoginSubmit = async (adminInfo: AdminLoginData) =>{
    try{
        const response = await adminLogin(adminInfo);
        dispatch(setToken({adminToken : response.data.token}))
        navigate('/admin/dashboard')  
        notify("Login Success",'success')
    }catch(error){
      console.error(error);
    }
  }


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
          Admin Login.
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
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminLoginPage