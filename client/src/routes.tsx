import { createBrowserRouter } from "react-router-dom"
import UserSignupPage from "./components/pages/user-pages/user-signup"
import UserLoginPage from "./components/pages/user-pages/user-login"
import { Admin , User} from "./App"
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
import UsersListPage from "./components/pages/admin-pages/users-list"
import AllCoursePage from "./components/pages/admin-pages/all-courses"
import UserHomePage from "./components/pages/user-pages/user-HomePage"

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <User />, 
    children:[
      {
        path : "/",
        element: <UserHomePage />,
      }
    ]
  },
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
      },
      {
        path: "users-list",
        element: <UsersListPage />
      },
      {
        path: "all-course-list",
        element: <AllCoursePage />
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