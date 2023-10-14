import React  from "react"
import {  Outlet } from "react-router-dom"
import AdminLoginPage from "./components/pages/admin-pages/admin-login";
import Header from "./components/admin/header";
import SideBar from "./components/admin/sidebar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectIsLoggedIn } from "./redux/reducers/adminAuthSlice";
import UserHeader from "./components/user/userHeader";
import FooterComponent from "./components/user/footer";

export const User : React.FC = () =>{

  return (
  <>
    <UserHeader />
    <Outlet />
    <FooterComponent />
  </>
  )

}

export const Admin: React.FC = () => {
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className="flex h-screen">
      {isLoggedIn ? (
        <>
          <div className="w-[268px]  h-full  top-10 left-0">
            <SideBar />
          </div>
          <div className="flex flex-col flex-grow">
            <Header />
            <div className="flex-grow p-4">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <AdminLoginPage />
      )}
    </div>
  );
};




