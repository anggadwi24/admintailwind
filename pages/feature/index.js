
import MainLayout from "../../layouts/MainLayout"
import { useAuth } from '../../contexts/auth';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import useSWR, { mutate } from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import Router, { useRouter } from 'next/router';

const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)

const Index = () => {
    const breadcrumb = [{'name':'Feature','url':'/feature'}];
    const {user,level} = useAuth();
    const token = Cookies.get('token');
    const router = useRouter();
    const [showToast,setShowToast] = useState(false);
    const [type,setType] = useState('success');
    const {data,error,mutate} = useSWR([`https://kasirku.juastudio.com/api/feature`,token],fetcher);
    const { query } = useRouter();

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
        
        if(level !== 'admin'){
            router.push(
                { pathname: "/", query: { message: "You cant access this page",type:'error' } },"/resource?type=error"
               
              );
        }
        return (
            <MainLayout  user={user} title="Feature - JUAPOS" page="Feature" breadcrumb={breadcrumb}>
                <div className='flex justify-between mb-4'>
            
                    <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                    Data Feature
                    </h4>
                    <Link href="/feature/add" className='btn btn-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>

                    </Link>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-3 sm-grid-cols-1 gap-4">
                    {data.data.length > 0 && 
                        data.data.map( (value,index) => {
                          
                           
                            return (
                                <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700" key={value.slug}>
                                    <h5 className="mb-0 text-xl font-medium text-gray-500 dark:text-gray-400">{value.name}</h5>
                                    <p className="mb-4 text-sm font-small text-gray-400 dark:text-gray-200">{value.description}</p>
                                    {value.price.length > 0 && 
                                    <div className="flex items-baseline text-gray-900 dark:text-white">
                                         <span className="text-3xl font-semibold">Rp.</span>
                                         <span className="text-5xl font-extrabold tracking-tight">{value.price[0].price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span>
                                         <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/{value.price[0].duration}</span>
                                     </div>
                                    }
                                   
                                    {value.resource.length > 0 && 
                                    <ul role="list" className="space-y-5 my-7">
                                        
                                        {value.resource.map( (resource,index) => {
                                                return (
                                                   
                                                    <li className={'flex space-x-3 ' + (resource.value == 'n' ? 'line-through decoration-gray-500' : '')} key={resource.id}>
                                        
                                                        <svg aria-hidden="true" className={"flex-shrink-0 w-5 h-5 " + (resource.value == 'n' ? 'text-gray-400 dark:text-gray-500' : ' text-blue-600 dark:text-blue-500')} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"><b>{resource.capacity ?  resource.capacity : 'Unlimited'  }</b> {resource.name}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                        
                                        
                                        
                                    </ul>
                                    }
                                    <div className="flex flex-row-reverse ">
                                        <button type="button" className="text-white text-center bg-red-400 hover:bg-red-600 font-medium rounded-lg px-3 py-2.5 mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                        <button type="button" className="text-white text-center bg-yellow-400 hover:bg-yellow-600 font-medium rounded-lg px-3 py-2.5 mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                        <button type="button" className="text-white text-center bg-indigo-600 hover:bg-indigo-800 font-medium rounded-lg px-3 py-2.5 mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>                                                                     
                                    </div>
                                </div>
                            )
                        })
                    }
                   
                </div>
                
            
            
            
                            
            
                            
            </MainLayout>
        )
    }
}

export default Index