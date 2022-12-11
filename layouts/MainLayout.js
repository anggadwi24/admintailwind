import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import HeadMeta from "../components/HeadMeta";


const MainLayout = ({children,user,title,page,subpage}) =>{
  
    useEffect(() =>
    {        
        document.body.classList.add("bg-gray-100");
      


    });
    return (
        <>
        <HeadMeta title={title}>
            

           
           
        </HeadMeta>
        <Navbar user={user}></Navbar>
       
       
            <div className="h-screen flex flex-row flex-wrap">
                <Sidebar user={user}/>
                <div className="bg-gray-100 flex-1 p-6 md:mt-16">
                    <h1 className="h5">{page}</h1>
                    <p>{subpage}</p>
                    <hr className="my-5"/>
                    {children}

                </div>
                        
                 
                
               
            </div>
           

          
            <Script src="/assets/js/scripts.js" ></Script> 
        
        </>
    )
}

export default MainLayout;