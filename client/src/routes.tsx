import { createBrowserRouter } from "react-router-dom"
import UserSignupPage from "./components/pages/user-pages/user-signup"
import UserLoginPage from "./components/pages/user-pages/user-login"
import { Admin } from "./App"
import OtpVerifyComponent from "./components/common/otp-verify-component"
import AdminHomePage from "./components/pages/admin-pages/adminHome"
import TrainerRegister from "./components/pages/trainer-pages/trainer-register"
import TrainerLogin from "./components/pages/trainer-pages/trainer-login"
import PendingTrainersTable from "./components/admin/pendingTrainerVerification"
import TrainerDashboard from "./components/pages/trainer-pages/dashboard"
import DashboardLayout from "./components/trainer/dashboardLayout"
import CoursesTable from "./components/pages/trainer-pages/my-courses"
import AddCoursePage from "./components/pages/trainer-pages/add-course"
import AddChapterPage from "./components/pages/trainer-pages/add-chapter"
import CourseManagement from "./components/pages/trainer-pages/course-management"


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
        path: "dashboard",
        element :<AdminHomePage />
      },
      {
        path: "trainers-requests",
        element :<PendingTrainersTable />
      }
    ]
  },
  {
    path: "/trainer/register",
    element :<TrainerRegister />
  },
  {
    path : "/trainer/login",
    element :<TrainerLogin />
  },
  {
    path : "/trainer",
    element: <DashboardLayout />,
    children : [
      {
        path : "",
        element: <TrainerDashboard />
      },
      {
        path: "my-courses",
        element: <CoursesTable />
      },
      {
        path: "add-course",
        element: <AddCoursePage />
      },
      {
        path: "course/add-chapter/:courseId",
        element: <AddChapterPage />
      },
      {
        path:"course/:courseId",
        element: <CourseManagement />
      }
      
    ]
  }
])

export default AppRouter