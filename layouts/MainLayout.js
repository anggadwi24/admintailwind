import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import HeadMeta from "../components/HeadMeta";


const MainLayout = ({children,user,title,page,breadcrumb = []}) =>{
   
    const [isSideMenuOpen,setIsSideMenuOpen] = useState(false);
   
    const condition = isSideMenuOpen ? 'overflow-hidden' : '';
    return (
        <>
        <HeadMeta title={title}>
            

           
           
        </HeadMeta>
        
       
            <div
                className={`flex h-screen bg-gray-50 dark:bg-gray-900  ${condition}`}
                
            >
          
                <Sidebar user={user} isSideMenuOpen={isSideMenuOpen} />
                <div className="flex flex-col flex-1 w-full">
                    <Navbar props={{user,setIsSideMenuOpen,isSideMenuOpen,breadcrumb}} ></Navbar>
                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mx-auto grid">
                            <h2
                                className="mt-4 mb-1 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {page}
                            </h2>
                            {children}
                        </div>
                    </main>
                </div>
               
              
                        
                 
                
               
            </div>
            <div id="modal-root"></div>
           

            <Script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></Script>
            <Script src="/assets/js/init-alpine.js"></Script>
          
        
        </>
    )
}

export default MainLayout;