import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import HeadMeta from "../components/HeadMeta";


const MainLayout = ({children,user,title,page,subpage}) =>{
    const [isSideMenuOpen,setIsSideMenuOpen] = useState(false);
   
    const condition = isSideMenuOpen ? 'overflow-hidden' : '';
    return (
        <>
        <HeadMeta title={title}>
            

           
           
        </HeadMeta>
        {/* <Navbar user={user}></Navbar> */}
       
            <div
                className={`flex h-screen bg-gray-50 dark:bg-gray-900  ${condition}`}
                
            >
          
                <Sidebar user={user} isSideMenuOpen={isSideMenuOpen}/>
                <div className="flex flex-col flex-1 w-full">
                    <Navbar props={{user,setIsSideMenuOpen,isSideMenuOpen}} ></Navbar>
                </div>
                {/* <div className="bg-gray-100 flex-1 p-6 md:mt-16">
                    <h1 className="h5">{page}</h1>
                    <p>{subpage}</p>
                    <hr className="my-5"/>
                    {children}

                </div> */}
                        
                 
                
               
            </div>
           

          
            {/* <Script src="/assets/js/scripts.js" ></Script>  */}
        
        </>
    )
}

export default MainLayout;