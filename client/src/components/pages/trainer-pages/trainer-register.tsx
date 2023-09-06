import React , {useState} from "react";
import { AxiosError } from "axios";
import { TrainerFormData } from "../../../types/trainerTypes";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage  } from "formik";
import { notify , ToastContainer } from "../../../utils/notificationUtils";
import { TrainerRegisterValidationSchema } from "../../../validations/auth/authValidation";
import { registerTrainer } from "../../../api/endpoints/auth/trainer-auth";
import { ScaleLoader } from "react-spinners";

const  TrainerRegister : React.FC = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (values : TrainerFormData) => {
    try {
      setLoading(true);
      const { firstName, lastName, email, password, confirmPassword, certificates } = values;
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      for (let i = 0; i < certificates.length; i++) {
        formData.append('certificates', certificates[i]);
      }
      const response = await registerTrainer(formData);
      setLoading(false);
      if (response.status === 201) {
        notify("Registration successful! Admin will verify shortly", "success");
        setTimeout(()=>{navigate('/trainer/login')},3000)
      } else {
        notify("Registration failed. Please try again.", "error");
      }
    }  catch (error: unknown) {
      console.error("Error during registration:", error);
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred during registration.", "error");
      }
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    certificates: [],
  };


  return (
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
            alt="Your Company"
          />
        </div>
        <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
          Register to create a Trainer account.
        </h2>
        <div className="mt-10 sm:w-full sm:max-w-xs">
          <Formik
            initialValues={initialValues}
            validationSchema={TrainerRegisterValidationSchema}
            onSubmit={handleSubmit}
          >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
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
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="certificates"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Certificates
                </label>
                <div className="mt-2">
                  <input
                    id="certificates"
                    name="certificates"
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png"
                    className="block"
                    onChange={(event) => {
                      setFieldValue("certificates", event.currentTarget.files);
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </Form>
            )}
          </Formik>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/trainer/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainerRegister