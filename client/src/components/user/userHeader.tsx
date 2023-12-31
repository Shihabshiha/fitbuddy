import React, {  useState , useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon , PlusCircleIcon } from '@heroicons/react/24/outline'
import ProfileMenu from './profileMenu'
import { Link, useNavigate } from 'react-router-dom'
import MyPrograms from './myPrograms'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/userSlice'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const UserHeader : React.FC = () => {

  const isLoggedIn =localStorage.getItem("userToken")
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isEnrolledAnyProgram = user.userDetails?.enrolledPrograms?.length ?? 0 > 0;

  

  const initialNavigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Programs', href: '/programs', current: false },
    { name: 'About us', href: '/about', current: false }
  ];

  const [navigation, setNavigation] = useState(initialNavigation);


  const handleNavigationClick = (clickedItemName:string) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.name === clickedItemName,
    }));
    setNavigation(updatedNavigation);

    localStorage.setItem('selectedNavItem', clickedItemName);
  };

  useEffect(() => {
    const selectedNavItem = localStorage.getItem('selectedNavItem');
  
    if (selectedNavItem) {
      const updatedNavigation = navigation.map((item) => ({
        ...item,
        current: item.name === selectedNavItem,
      }));
      setNavigation(updatedNavigation);
    } else {
      const updatedNavigation = navigation.map((item) => ({
        ...item,
        current: item.name === 'Home',
      }));
      setNavigation(updatedNavigation);
  
      localStorage.setItem('selectedNavItem', 'Home');
    }
  }, []);

  const handleLogoSelection = () => {
    navigate("/")
  }
  

  const handleLogin = () => {
    localStorage.setItem("reffererUrl",window.location.pathname)
    navigate('/login')
  }


  return (
    <Disclosure as="nav" className="fixed top-0 left-0 right-0 bg-gray-700 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto hover:cursor-pointer"
                    src="https://res.cloudinary.com/duuwbsmdu/image/upload/c_thumb,w_200,g_face/v1695378550/fitbuddy/fitbuddy-white-transparent_logo_c4peq4.svg"
                    onClick={handleLogoSelection}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={() => handleNavigationClick(item.name)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               <div className="sm:hidden ml-2">
                {isLoggedIn ? (
                  <ProfileMenu />
                ) : (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">Open user menu</span>
                            {open ? (
                               <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ):(
                              <PlusCircleIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
                          </Disclosure.Button>

                          <Disclosure.Panel className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <button
                                onClick={handleLogin}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-900"
                              >
                                Login
                              </button>
                              <a
                                href="/trainer/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-900"
                              >
                                Trainer login
                              </a>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
              </div>

                <div className="hidden sm:block">
                  {isLoggedIn ? (
                    <div className='flex justify-between items-center'>
                    {isEnrolledAnyProgram ? <MyPrograms /> : null}
                    <ProfileMenu />
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleLogin}
                        className="px-3 py-2 ml-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white rounded-md"
                      >
                        Login
                      </button>
                      <a
                        href="/trainer/login"
                        className="px-3 py-2 ml-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white rounded-md"
                      >
                        Trainer Login
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}


export default UserHeader;