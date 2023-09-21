import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
 
const SideBar = ()=> {

  const handleLogout = () => {
    // Clear the adminToken from local storage
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };
  return (
    <Card className="h-[calc(100vh-2rem)] w-[16rem] p-4  ml-2 border-r-2 border-blue-gray-200  transition-shadow duration-300 rounded-none shadow-none">
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Link to="/admin/trainers-requests" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
              </svg>
              <span className="ml-2">Trainer Requests</span>
            </Link>
          </ListItemPrefix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Link to="/admin/users-list" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
              <span className="ml-2">Users List  </span>
            </Link>
          </ListItemPrefix>   
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Link to="/admin/all-course-list" className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.5C2 3.11929 3.11929 2 4.5 2H15.5C16.8807 2 18 3.11929 18 4.5C18 5.88071 16.8807 7 15.5 7H4.5C3.11929 7 2 5.88071 2 4.5Z" fill="currentColor"/>
                <path d="M2.75 9.08337C2.33579 9.08337 2 9.41916 2 9.83337C2 10.2476 2.33579 10.5834 2.75 10.5834H17.25C17.6642 10.5834 18 10.2476 18 9.83337C18 9.41916 17.6642 9.08337 17.25 9.08337H2.75Z" fill="currentColor"/>
                <path d="M2.75 12.6633C2.33579 12.6633 2 12.9991 2 13.4133C2 13.8275 2.33579 14.1633 2.75 14.1633H17.25C17.6642 14.1633 18 13.8275 18 13.4133C18 12.9991 17.6642 12.6633 17.25 12.6633H2.75Z" fill="currentColor"/>
                <path d="M2.75 16.25C2.33579 16.25 2 16.5858 2 17C2 17.4143 2.33579 17.75 2.75 17.75H17.25C17.6642 17.75 18 17.4143 18 17C18 16.5858 17.6642 16.25 17.25 16.25H2.75Z" fill="currentColor"/>
              </svg>
              <span className="ml-2">All Courses</span>
            </Link>
          </ListItemPrefix>   
        </ListItem>
        {/* <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="1" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> */}
        {/* <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem> */}
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default SideBar

