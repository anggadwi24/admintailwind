

import styles from '../../styles/Home.module.css'
import { useAuth } from '../../contexts/auth';
import MainLayout from '../../layouts/MainLayout';
import Link from 'next/link';

import React, { useState, useEffect } from 'react'
import api from '../../lib/Api';
import { useRouter } from "next/router";
import ModalDelete from '../../components/ModalDelete';


const Users = (props) =>{
 
    const {user,setError} = useAuth();
    const router = useRouter();
    
    const breadcrumb = [{'name':'User','url':'/users'}];
    const [showModal,setShowModal] = useState(false);
   

 
        if(props.user.statusCode == 200){
            return (
                <>
                  
                    <MainLayout user={user} title="Users - JUAPOS" page="Users" breadcrumb={breadcrumb}>
                        <div className='flex justify-between mb-4'>
        
                            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                            Data Users
                            </h4>
                            <Link href="/users/add" className='btn btn-primary'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
        
                            </Link>
                        </div>

                        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto">
                                {!props && 
                                 <div className="relative">
                                    <div className="absolute inset-0 h-screen flex">
                                        <div className="m-auto">
                                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                        
                                        </div>
                                    </div>
                                </div>
                                }
                                {props && 
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
                                                Email
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Level
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Verify
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            </tr>
                                        </thead>
                                       
                                            {props.user && props.user.record.length > 0 &&
                                           
                                                
                                           
                                             <tbody>
                                                {props.user.record.map((value,index) => {
                                                    return(
                                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={value.email}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {value.name}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {value.email}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize  ">
                                                                {value.level}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {value.verify && 'Verify'}
                                                                {!value.verify && 'Unverivied'}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                                                                <div className="flex items-center space-x-4 text-sm">
                                                                    <Link href={'users/edit/'+[value.email]} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                                    </svg>
                                                                    </Link>
                                                                    <button  onClick={() =>setShowModal(true)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                               
                                               
                                                  
                                                })}
                                               
                                            </tbody>
                                             }
                                            
                                        
                                </table>
                                }
                            </div>
                        </div>
                                
                        
                        <ModalDelete
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                Hello from the modal!
            </ModalDelete>
                        
                    </MainLayout>
               
                </>
               
               
            )
        }else{
           
           
                router.push({
                    pathname: '/',
                    query: { name: 'Someone' }
                }, '/');
                
             
        }
    
  
   
}
export async function getServerSideProps({req,res}) {

    
    const token = req.cookies.token;
    
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data: user } = await api.get('api/users')
   
   
    if (user){
        return {
            props:{
                user:user,
                loading:false,
            },
        }
    } 

  
}
export default Users;