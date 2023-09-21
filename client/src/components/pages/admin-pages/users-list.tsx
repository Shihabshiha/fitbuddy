import React, { useState , useEffect } from "react";
import { IuserList } from "../../../types/adminTypes";
import { notify, ToastContainer } from "../../../utils/notificationUtils";
import { AxiosError } from "axios";
import { getUserList } from "../../../api/endpoints/admin";
import TableSkeltonShimmer from "../../shimmers/tableSkelton";
import BlockUnblockButton from "../../admin/blockUnblockButton";
import ReactPaginate from 'react-paginate';

const UsersListPage : React.FC = () => {
  const [users,setUsers] = useState<IuserList[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage : number = 4; 
  const pageCount : number = Math.ceil(users.length / itemsPerPage);

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

  const handleUpdateUser = (updatedUser:IuserList) => {
    setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    )
  );
 }

 const handlePageChange = ({ selected }: { selected: number }) => {
  setCurrentPage(selected);
};

const currentUsers = users.slice(
  currentPage * itemsPerPage,
  (currentPage + 1) * itemsPerPage
);


  return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">User List</h1>
        {isLoading ? (
          <TableSkeltonShimmer />
        ):(
        <>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
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
            {currentUsers.map((user, index) => {
              // Calculate the correct "Sl No" based on current page and user index
              const slNo = currentPage * itemsPerPage + index + 1;
              return (
                <tr key={user._id}>
                  <td className="px-6 py-4">{slNo}</td>
                  <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <BlockUnblockButton
                      user={user}
                      onBlockUnblockUser={handleUpdateUser}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
         <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Previous</span>}
          nextLabel={<span className="px-2 py-1 bg-blue-500 text-white rounded-md">Next</span>}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex space-x-2"}
          activeClassName={"active"}
        />
       </>
        )}
      <ToastContainer />
    </div>
  )
}

export default UsersListPage