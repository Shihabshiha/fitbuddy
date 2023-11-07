import { lazy , Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"

import { Admin , User} from "./App"

const LazyUserHomePage = lazy(() => import("./components/pages/user-pages/user-HomePage"));
const LazyAllProgramsPage = lazy(() => import("./components/pages/user-pages/allPrograms"));
const LazyUserInboxPage = lazy(() => import("./components/pages/user-pages/inbox"));
const LazyProgramDetailPage = lazy(() => import("./components/pages/user-pages/program-datails"));
const LazyVideoPage = lazy(() => import("./components/pages/user-pages/videoPage"));
const LazyProfilePage = lazy(() => import("./components/pages/user-pages/profile"));
import UserLoginPage from "./components/pages/user-pages/user-login"
import UserSignupPage from "./components/pages/user-pages/user-signup";
import OtpVerifyComponent from "./components/common/otp-verify-component"

const LazyAdminHomePage = lazy(() => import("./components/pages/admin-pages/adminHome"));
const LazyPendingTrainersTable = lazy(() => import("./components/admin/pendingTrainerVerification"));
const LazyUsersListPage = lazy(() => import("./components/pages/admin-pages/users-list"));
const LazyAllCoursePage = lazy(() => import("./components/pages/admin-pages/all-courses"));


import TrainerRegister from "./components/pages/trainer-pages/trainer-register"
import TrainerLogin from "./components/pages/trainer-pages/trainer-login"
import DashboardLayout from "./components/trainer/dashboardLayout"

const LazyTrainerDashboard = lazy(() => import("./components/pages/trainer-pages/dashboard"));
const LazyCoursesTable = lazy(() => import("./components/pages/trainer-pages/my-courses"));
const LazyAddCoursePage = lazy(() => import("./components/pages/trainer-pages/add-course"));
const LazyAddChapterPage = lazy(() => import("./components/pages/trainer-pages/add-chapter"));
const LazyCourseManagement = lazy(() => import("./components/pages/trainer-pages/course-management"));
const LazyNotificationPage = lazy(() => import("./components/pages/trainer-pages/notificationPage"));
const LazyEnrollmentsPage = lazy(() => import("./components/pages/trainer-pages/enrollments"));
const LazyInboxPage = lazy(() => import("./components/pages/trainer-pages/inbox"));


import ErrorPage from "./components/common/errorPage"

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><User /></Suspense>, 
    errorElement : <ErrorPage />,
    children:[
      {
        path : "/",
        element: <LazyUserHomePage />,
      },
      {
        path : "/program/:programId",
        element : <LazyProgramDetailPage />
      },
      {
        path : "/program/video/:index",
        element : <LazyVideoPage />
      },
      {
        path : "/profile",
        element :<LazyProfilePage />
      },
      {
        path : "/programs",
        element : <LazyAllProgramsPage />
      },
      {
        path: "/inbox/:chatId?",
        element : <LazyUserInboxPage />
      }
    ]
  },
  {
    path : "/register-otp-verify",
    element :<Suspense fallback={<div>Loading...</div>}><OtpVerifyComponent /></Suspense>,
  },
  {
    path: "/signup",
    element:<Suspense fallback={<div>Loading...</div>}><UserSignupPage /></Suspense>,
  },
  {
    path: "/login",
    element :<Suspense fallback={<div>Loading...</div>}><UserLoginPage /></Suspense>,
  },
  {
    path: "/admin",
    element : <Suspense fallback={<div>Loading...</div>}><Admin /></Suspense>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element :<LazyAdminHomePage />
      },
      {
        path: "trainers-requests",
        element :<LazyPendingTrainersTable />
      },
      {
        path: "users-list",
        element: <LazyUsersListPage />
      },
      {
        path: "all-course-list",
        element: <LazyAllCoursePage />
      }
    ]
  },
  {
    path: "/trainer/register",
    element :<Suspense fallback={<div>Loading...</div>}><TrainerRegister /></Suspense>,
  },
  {
    path : "/trainer/login",
    element :<Suspense fallback={<div>Loading...</div>}><TrainerLogin /></Suspense>,
  },
  {
    path : "/trainer",
    element: <Suspense fallback={<div>Loading...</div>}><DashboardLayout /></Suspense>,
    errorElement : <ErrorPage />,
    children : [
      {
        path : "",
        element: <LazyTrainerDashboard />
      },
      {
        path: "my-courses",
        element: <LazyCoursesTable />
      },
      {
        path: "add-course",
        element: <LazyAddCoursePage />
      },
      {
        path: "course/add-chapter/:courseId",
        element: <LazyAddChapterPage />
      },
      {
        path:"course/:courseId",
        element: <LazyCourseManagement />
      },
      {
        path:"notifications",
        element: <LazyNotificationPage />
      },
      {
        path: "enrollments",
        element :<LazyEnrollmentsPage />
      },
      {
        path : "inbox/:chatId?",
        element : <LazyInboxPage />
      }
      
    ]
  }
])

export default AppRouter


