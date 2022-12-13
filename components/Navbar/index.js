import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from "next/link";
import { useState } from 'react';

const Navbar = ({props}) =>{
    
    const [openMenu,setOpenMenu] = useState(false);
   
    const handleSideMenu = async () =>{
      
      if(props.isSideMenuOpen == true){
         props.setIsSideMenuOpen(false);
        
      }else{
        props.setIsSideMenuOpen(true);

      }
    
     
    }

    const handleProfile = () =>{
      setOpenMenu(current => !current);
    }
    return (
      <>

<header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div
            className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                  Home
                </Link>
              </li>
              {props.breadcrumb && props.breadcrumb.length > 0 &&
                props.breadcrumb.map((value,index) => {
                 
                  return (
                   
                    <li key={index}>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                      <Link href={value.url} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">{value.name}</Link>
                    </div>
                  </li>
                  )
                })
              }
             
             
            </ol>
            <button
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={handleSideMenu}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          
        
            <ul className="flex items-center  flex-shrink-0 space-x-6">
              
           
           
                       
              <li className="relative">
                <button onClick={handleProfile}
                  className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                
                  aria-label="Account"
                  aria-haspopup="true"
                >
                  <Image
                    className="object-cover w-8 h-8 rounded-full"
                    src="/assets/img/profile.jfif"
                    alt=""
                    aria-hidden="true"
                    width={200}
                    height={200}
                  />
                </button>
                  {openMenu && 
                     <ul
                    
                 
                 
                     className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                     aria-label="submenu"
                   >
                     <li className="flex">
                       <a
                         className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                         href="#"
                       >
                         <svg
                           className="w-4 h-4 mr-3"
                           aria-hidden="true"
                           fill="none"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                         >
                           <path
                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                           ></path>
                         </svg>
                         <span>Profile</span>
                       </a>
                     </li>
                   
                     <li className="flex">
                      <Link  className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                         href="/logout">
                            <svg
                              className="w-4 h-4 mr-3"
                              aria-hidden="true"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              ></path>
                            </svg>
                         <span>Log out</span>
                      </Link>
                     
                     </li>
                   </ul>
                  }
                 
               
              </li>
            </ul>
          </div>
        </header>
      </>
    )
}

export default Navbar;