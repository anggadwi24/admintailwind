import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from "next/link";

const Navbar = ({user}) =>{
  
   
    return (
      <div className="md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
    
 
    <div className="flex-none w-56 flex flex-row items-center">
      <Image src="/assets/img/logo.png"  className="w-10 flex-none" height={100} width={100} alt="JUA-POS"/>
      
      <strong className="capitalize ml-1 flex-1">JUAPOS</strong>

      <button id="sliderBtn" className="flex-none text-right text-gray-900 hidden md:block">
        <i className="fad fa-list-ul"></i>
      </button>
    </div>
    
    
   
    <button id="navbarToggle" className="hidden md:block md:fixed right-0 mr-6">
      <i className="fad fa-chevron-double-down"></i>
    </button>
 
    <div id="navbar" className="animated md:hidden md:fixed md:top-0 md:w-full md:left-0 md:mt-16 md:border-t md:border-b md:border-gray-200 md:p-10 md:bg-white flex-1 pl-3 flex flex-row flex-wrap justify-end items-center md:flex-col md:items-center">
     
      
   
    
      <div className="flex flex-row-reverse items-end"> 

        <div className="dropdown relative md:static">

          <button className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <Image src="/assets/img/user.svg"  className="w-full h-full object-cover" height={100} width={100} alt={user.name}/>
              
            </div> 

            <div className="ml-2 capitalize flex ">
              <h1 className="text-sm text-gray-800 font-semibold m-0 p-0 leading-none">{user.name}</h1>
              <i className="fad fa-chevron-down ml-2 text-xs leading-none"></i>
            </div>                        
          </button>

          <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>

          <div className="text-gray-500 menu hidden md:mt-10 md:w-full rounded bg-white shadow-md absolute z-20 right-0 w-40 mt-5 py-2 animated faster">

          
            <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
              <i className="fad fa-user-edit text-xs mr-1"></i> 
              edit my profile
            </a>     
            
            
           

            <hr/>

           <Link href="/logout" className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out">
           <i className="fad fa-user-times text-xs mr-1"></i> 
              log out
           </Link>
    
          

          </div>
        </div>
        

       
       
      
    
   

      </div>
     
    </div>

  </div>
    )
}

export default Navbar;