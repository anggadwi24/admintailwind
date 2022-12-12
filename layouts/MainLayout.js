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
                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mx-auto grid">
                            <h2
                                className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {page}
                            </h2>
                            {children}
                        </div>
                    </main>
                </div>
               
              
                        
                 
                
               
            </div>
           

          
          
        
        </>
    )
}

export default MainLayout;