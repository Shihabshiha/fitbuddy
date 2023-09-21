import React, { useState , useEffect } from "react";
import { IuserList } from "../../../types/adminTypes";
import { notify, ToastContainer } from "../../../utils/notificationUtils";
import { AxiosError } from "axios";
import { getUserList } from "../../../api/endpoints/admin";
import TableSkeltonShimmer from "../../shimmers/tableSkelton";
import BlockUnblockButton from "../../admin/blockUnblockButton";


const UsersListPage : React.FC = () => {
  const [users,setUsers] = useState<IuserList[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchUsersList = async() => {
      try{
        const response = await getUserList()
        setUsers(response?.data?.users)
        setIsLoading(false)
      }catch(error:unknown){
        setIsLoading(false)
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("An error occured in fetching users data.", "error");
        }
      }
    }
    fetchUsersList()
  },[])

  // const HandleBlockUnblock = async ( userId: string , isBlocked :boolean) =>{
  //   try{
  //     setLoading(true)
  //     const result = await blockUnblock(userId,isBlocked)
  //     const updatedUser = result?.data.updatedUser;
  //     setUsers((prevUsers) => {
  //       const updatedUsers = prevUsers.map((user) =>
  //         user._id === updatedUser._id ? updatedUser : user
  //       );
  //       return updatedUsers;
  //     })
  //     setLoading(false)
  //   }catch(error:unknown){
  //     setLoading(false)
  //     if (error instanceof AxiosError && error.response?.data?.error) {
  //       notify(error.response.data.error, "error");
  //     } else {
  //       notify("An error occured in .", "error");
  //     }
  //   }
  // }

  const handleUpdateUser = (updatedUser:IuserList) => {
    setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    )
  );

  }


  return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">User List</h1>
        {isLoading ? (
          <TableSkeltonShimmer />
        ):(
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sl No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? "bg-gray-200" : ""}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <BlockUnblockButton user={user} onBlockUnblockUser={handleUpdateUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      <ToastContainer />
    </div>
  )
}

export default UsersListPage