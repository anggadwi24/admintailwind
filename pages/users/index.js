
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import { useAuth } from '../../contexts/auth';
import MainLayout from '../../layouts/MainLayout';
import Link from 'next/link';
import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import api from '../../lib/Api';


const Users = (list) =>{
   
    const {user} = useAuth();
   

   
    return (
        <>
          
            <MainLayout user={user} title="Users - JUAPOS" page="Users" subpage="">
                <div className='card p-5'>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className='flex flex-no-wrap justify-between'>
                                <div className="flex-initial  text-gray-900 font-bold text-xl mb-2">Users List</div>
                                <div className="flex-initial  text-gray-900 font-bold text-xl mb-2">
                                    <Link href="/users/add">
                                        <i className='fa fa-plus'></i>
                                    </Link>
                                </div>

                            </div>
                            

                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
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
                                        #
                                    </th>
                                    </tr>
                                </thead>
                               
                                    {list.user.record.length > 0 &&
                                   
                                        
                                   
                                     <tbody>
                                        {list.user.record.map((value,index) => {
                                            return(
                                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={value.email}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {value.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {value.email}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {value.level}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        
                                                    </td>
                                                </tr>
                                            )
                                       
                                       
                                          
                                        })}
                                       
                                    </tbody>
                                     }
                                    
                                
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </MainLayout>
        </>
       
       
    )
}
export async function getServerSideProps({req,res}) {
    const token = req.cookies.token;
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data: user } = await api.get('api/users')
  
    if (user){
        return {
            props:{user},
        }
    } 

  
}
export default Users;