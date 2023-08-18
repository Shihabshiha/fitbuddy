import { createBrowserRouter } from "react-router-dom"
import UserSignupPage from "./components/pages/user-pages/user-signup"
import UserLoginPage from "./components/pages/user-pages/user-login"
import { Admin } from "./App"
import OtpVerifyComponent from "./components/common/otp-verify-component"

const AppRouter = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <user />, 
  //   children:[
  //     {
  //       path : "/",
  //       element: <UserHomePage />,
  //     }
  //   ]
  // },
  {
    path : "/register-otp-verify",
    element :<OtpVerifyComponent />
  },
  {
    path: "/signup",
    element:<UserSignupPage />
  },
  {
    path: "/login",
    element :<UserLoginPage />
  },
  {
    path: "/admin",
    element :<Admin />,
    children: [
      {
        
      }
    ]
  },
  // {
  //   path: "/trainer/register",
  //   element :<TrainerRegisterPage />
  // }
])

export default AppRouter