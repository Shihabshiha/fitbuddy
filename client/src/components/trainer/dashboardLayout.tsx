import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PresentationChartBarIcon, AcademicCapIcon, PowerIcon ,BellIcon ,ClipboardDocumentListIcon , EnvelopeIcon} from "@heroicons/react/24/solid";
import { HashLoader } from "react-spinners";
import { AxiosError } from "axios";
import { notify , ToastContainer } from "../../utils/notificationUtils";
import { getNotificationCount } from "../../api/endpoints/trainer";
import { markNotificationRead } from "../../api/endpoints/trainer";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const handleLogout = () => {
    // Clear the adminToken from local storage
    localStorage.removeItem("trainerToken");
    window.location.href = "/trainer";
  };

  useEffect(() => {
    const trainerToken = localStorage.getItem("trainerToken");
    if (!trainerToken) {
      navigate("/trainer/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  const fetchUnreadNotificationCount = async() => {
    try{
      const response = await getNotificationCount();
      const count = response?.data?.count;
      setCount(count)
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong loading notifications.", "error");
      }
    }
  }

  const markNotificationAsRead = async () => {
    try{
      const response = await markNotificationRead();
      if(response.status === 200){
        setCount(0)
      }
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("something went wrong loading notifications.", "error");
      }
    }
  }

  useEffect(()=>{
    fetchUnreadNotificationCount()
    console.log("worked the side bar")
  },[])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#a81b11" loading={true} />
        </div>
      ) : (
        <>
          <header className="bg-white bg-opacity-80 py-2 px-4 md:px-8 lg:px-16 lg:py-4 border border-white/80 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200">
            <div className="container mx-auto flex items-center justify-between text-gray-900">
              <a href="#" className="mr-4 block cursor-pointer">
                <img
                  src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1691736353/fitbuddy/fitbuddy-high-resolution-logo-color-on-transparent-background_ehho4o.svg"
                  alt="Logo"
                  className="w-16 h-auto md:w-20"
                />
              </a>
              <h1 className="text-xl font-semibold">Trainer dashboard</h1>
            </div>
          </header>

          <div className="flex md:flex-cols-2">
            <nav className="md:w-64 bg-white border-r-2 h-[86vh] border-blue-gray-200  shadow-md">
              <ul className="space-y-2 py-4">
                <li className="p-2 flex items-center hover:bg-gray-100 transition-all duration-200">
                  <PresentationChartBarIcon className="h-5 w-5 mr-2" />
                  <span>
                    <Link to="/trainer" className="hover:underline">
                      Dashboard
                    </Link>
                  </span>
                </li>
                <li className="p-2 flex items-center hover:bg-gray-100 transition-all duration-200">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  <span>
                    <Link to="/trainer/my-courses" className="hover:underline">
                      My Courses
                    </Link>
                  </span>
                </li>
                <li className="p-2 flex items-center hover:bg-gray-100 transition-all duration-200">
                  <BellIcon className="h-5 w-5 mr-2" />
                  <span>
                    <Link to="/trainer/notifications" className="hover:underline" onClick={markNotificationAsRead}>
                      Notifications
                    </Link>
                  </span>
                  <span className="ml-3 bg-blue-gray-200 rounded-full px-2 text-sm">{count}</span>
                </li>
                <li className="p-2 flex items-center hover:bg-gray-100 transition-all duration-200">
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                  <span>
                    <Link to="/trainer/enrollments" className="hover:underline">
                      Enrollments
                    </Link>
                  </span>
                </li>
                <li className="p-2 flex items-center hover:bg-gray-100 transition-all duration-200">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  <span>
                    <Link to="/trainer/inbox/" className="hover:underline">
                      Inbox
                    </Link>
                  </span>
                </li>
                <li className="p-2 flex items-center hover:bg-black transition-all duration-200">
                  <PowerIcon className="h-5 w-5 mr-2 text-red-700" />
                  <span className="text-red-600 cursor-pointer " onClick={handleLogout}>
                    <span>Logout</span>
                  </span>
                </li>
              </ul>
            </nav>

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
              <Outlet />
            </main>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
