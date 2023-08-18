import React  from "react"
import { Outlet } from "react-router-dom"
import { useState , useEffect } from "react";
import AdminLoginPage from "./components/pages/admin-pages/admin-login";
import HeaderWithSidebar from "./components/admin/headerWithSide";



// export const user : React.FC = () =>{

//   <>
//     <UserHeader />
//     <Outlet />
//     <UserFooter />
//   </>

// }

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const token = localStorage.getItem("adminToken");
  console.log(token)
  const loginCheck = (): void => {
    token && setIsLoggedIn(true);
  };

  useEffect(() => {
    loginCheck();
  }); 

  return (
    <div>
      {isLoggedIn ? (
        <>
          <HeaderWithSidebar />
        </>
      ) : (
        <AdminLoginPage />
      )}
    </div>
  );
};

