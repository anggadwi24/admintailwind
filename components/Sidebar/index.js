import Link from 'next/link';
import Image from 'next/image';


export default function Sidebar({user}) {
   
  return (
    <div id="sideBar" className="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster">
         <div className="flex flex-col">
            <div className="text-right hidden md:block mb-4">
                <button id="sideBarHideBtn">
                <i className="fad fa-times-circle"></i>
                </button>
            </div>
            <p className="uppercase text-xs text-gray-600 mb-4 tracking-wider">home</p>
            <Link  href="/" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
                <i className="fad fa-chart-pie text-xs mr-2"></i>                
               dashboard
            </Link>
          
           
            <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">admin</p>
            <Link href="/users" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
           
                <i className="fad fa-users text-xs mr-2"></i>
                users
           
            </Link>
          
        </div>
    </div>

    
  )
}
