import MainLayout from "../../layouts/MainLayout"
import { useAuth } from '../../contexts/auth';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import Router, { useRouter } from 'next/router';
import Modal from "../../components/Modal";


const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)

const Index = (props) => {
    const breadcrumb = [{'name':'Resource','url':'/resource'}];
    const {user} = useAuth();
    const token = Cookies.get('token');
    const router = useRouter();
    const [showToast,setShowToast] = useState(false);
    const [page,setPage] = useState(router.query ?.page || 4)

    const {data,error} = useSWR([`https://kasirku.juastudio.com/api/resource?page=${page}`,token],fetcher);
    const { query } = useRouter();

  
   
    
    const [message,setMessage] = useState(null);
    useEffect( () => {
        router.push({pathname :'/resource',query: {page}})
        if(router.query.success){
            setMessage(query['message'])
            setShowToast(true);
        }
    },[page])
   const handleCloseToast = () =>{
        setShowToast(false);
        setMessage(null)
        router.push('/resource')
        delete router.query.success;

   }
   
   



    if(!data){
        return (
            <MainLayout  user={user} title="Resource - JUAPOS" page="Resource" breadcrumb={breadcrumb}>
                <div className="flex justify-center items-center py-5">
                    <svg aria-hidden="true" className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </MainLayout>
        )
           
        
    }
   

    if(data && data.statusCode != 200){
        return { 
            notFound: true
          }
    }
 
  if(data){
    

  return (
        <MainLayout  user={user} title="Resource - JUAPOS" page="Resource" breadcrumb={breadcrumb}>
             <div className='flex justify-between mb-4'>
        
                <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                Data Resource
                </h4>
                <Link href="/resource/add" className='btn btn-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>

                </Link>
            </div>
            <div className="w-full mb-2 overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead className="bg-white border-b">
                            <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                No
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Description
                            </th>
                           
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                          {data.record.data.length > 0 && 
                          data.record.data.map( (value,index) => {
                           
                            return (
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={value.slug}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: value.name }}></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: value.description }}></td>
                                    <td>
                                         <div className="flex items-center space-x-4 text-sm">
                                            <Link href={'resource/edit/'+[value.slug]} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                          })
                           
                          }
                        </tbody>
                    </table>
                   
                </div>
                          
            </div>
            {data.record.links && 
                <div className="w-full  py-8 overflow-hidden rounded-lg shadow-xs">
                  
                       <ul className="flex justify-center  -space-x-px">

                  {data.record.links.map( (value,index) => {
                    
                       return (
                           <li key={index}>
                                {data.record.current_page == value.label &&  
                                     <a  aria-current="page"  className="h-10 px-5 py-5 text-indigo-600 transition-colors duration-150  rounded-r-lg focus:shadow-outline bg-indigo-100" dangerouslySetInnerHTML={{ __html: value.label }}></a>
                                }
                                {data.record.current_page != value.label && 
                                    
                                     <Link href={`resource?page=${value.label}`} onClick={()=>setPage(value.label)} className="h-10 px-5 py-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100" dangerouslySetInnerHTML={{ __html: value.label }}></Link>

                                }
                              
                           </li>
                          
                       )
                   })
                   }
                       </ul>
                  
                </div>
                  
                  
               }
            {showToast &&  <div id="toast-success" className="flex absolute top-20 right-5 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                
                <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> 
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{query['message']}</div>
                <button type="button" onClick={() => handleCloseToast()} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
       
       
            </div> }
           
                          
           
                          
        </MainLayout>
        )
    }
       
      
}

export default Index