import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import HeadMeta from "../components/HeadMeta";


const MainLayout = ({children,user,title}) =>{
  
    useEffect(() =>
    {        
        document.body.classList.add("m-0");
        document.body.classList.add("font-sans");
        document.body.classList.add("antialiased");
        document.body.classList.add("font-normal");
        document.body.classList.add("text-base");
        document.body.classList.add("leading-default");
        document.body.classList.add("bg-gray-50");
        document.body.classList.add("text-slate-500");


    });
    return (
        <>
        <HeadMeta title={title}>
            

           
           
        </HeadMeta>
        <Sidebar user={user}/>
       
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
            <Navbar user={user}></Navbar>
                <div className="flex flex-col md:flex-row">
            
                <section>
                    <div id="main" className="main-content flex-1 bg-gray-100 mt-12  pb-24 md:pb-5">
                        {children}
                    </div>
                </section>
                
                </div>
            </main>
           

            <Script src="/assets/js/plugins/perfect-scrollbar.min.js" async></Script>

            <Script async defer src="https://buttons.github.io/buttons.js"></Script>

            <Script src="/assets/js/soft-ui-dashboard-tailwind.js?v=1.0.4" async></Script> 
        
        </>
    )
}

export default MainLayout;