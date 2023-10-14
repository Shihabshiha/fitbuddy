import React  , { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/userSlice'
import {  Menu, Transition } from '@headlessui/react'
import { clearUser } from '../../redux/reducers/userSlice'
import { USER_AVATHAR } from '../../constants/common'
import { notify , ToastContainer } from '../../utils/notificationUtils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const ProfileMenu : React.FC = () => {

  const user = useSelector(selectUser)
  

  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    clearUser()
    notify("logged out successfully","success")
    setTimeout(()=>{
      window.location.reload()
    },1500)
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={user.userDetails?.profileImage || USER_AVATHAR } alt="" /> 
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="/profile"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          {/* <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Settings
              </a>
            )}
          </Menu.Item> */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut} // Call the handleSignOut function on click
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
      <ToastContainer />
    </Menu>
  )
}

export default ProfileMenu;