import { useRouter } from "next/router";
import Cookies from "js-cookie";
import MainLayout from "../../../../layouts/MainLayout";
import { useAuth } from "../../../../contexts/auth"; 
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import useSWR, { mutate } from "swr";
import axios from "axios";
import Button from "../../../../components/Button";
import Textarea from "../../../../components/Textarea";
import Label from "../../../../components/Label";
import Input from "../../../../components/Input";



const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)

const Add = () => {
    const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Add','url':'/feature/add'}];
    const {user,level} = useAuth();
    const router = useRouter();
    const {slug} = router.query;
    const token = Cookies.get('token');
    const [name,setName] = useState([]);
    const [price,setPrice] = useState([]);
    const [discount,setDiscount] = useState([]);
    const [duration,setDuration] = useState([]);
    const [loading,setLoading] = useState(false);
    const [errors,setError] = useState([]);
    console.log(name);

    const {data,error,mutate} = useSWR([`https://kasirku.juastudio.com/api/feature/edit/${slug}`,token],fetcher);
    const submitHandler = (e) => {
        e.preventDefault();
        
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
         router.push(
                { pathname: "/feature", query: { message: data.message,type:'error' } },"/feature?type=error"
               
        );
    }else{
        if(level === 'admin'){
            return (
                <MainLayout  user={user} title="Feature - JUAPOS" page="Feature" breadcrumb={breadcrumb}>
                <div className='flex justify-between mb-0'>

                    <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                    Add Price
                    </h4>
            
                </div>
               
                <ol className="flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4" >
                    <li className="flex items-center justify-center text-blue-600">
                        <span className="rounded bg-green-50 p-1.5 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </li>
                    <li className="flex items-center justify-end">
                        <span
                        className="h-6 w-6 rounded bg-gray-50 text-center text-[10px] font-bold leading-6 text-gray-600"
                        >
                        2
                        </span>

                        <span className="ml-2"> Price </span>
                    </li>
                    <li className="flex items-center justify-end">
                        <span
                        className="h-6 w-6 rounded bg-gray-50 text-center text-[10px] font-bold leading-6 text-gray-600"
                        >
                        3
                        </span>

                        <span className="ml-2"> Resource </span>
                    </li>
                </ol>
                <div className="px-4 py-3   bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-no-wrap">
                            <Label className="w-2/5 block text-sm mb-4 mt-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Name
                                </span>
                                <Input 
                                    type="text" 
                                    className={ (errors && errors.name ? "border-red-400 bg-red-100 focus:border-red-700": "border-indigo-100 focus:border-indigo-400") + " block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    placeholder="Insert price name"
                                    onChange={(e) => setName([e.target.value])}
                                    disabled={loading == false ? '':true}
                                    value={name}

                                    
                                >
                                
                                </Input>
                                {errors && errors.name &&
                                    errors.name.map((value,index) => {
                                        return (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                        )
                                    })
                                }
                                
                                
                            </Label>
                            <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Name
                                </span>
                                <Input 
                                    type="text" 
                                    className={ (errors && errors.name ? "border-red-400 bg-red-100 focus:border-red-700": "border-indigo-100 focus:border-indigo-400") + " block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    placeholder="Insert price name"
                                    onChange={(e) => setName([e.target.value])}
                                    disabled={loading == false ? '':true}
                                    value={name}

                                    
                                >
                                
                                </Input>
                                {errors && errors.name &&
                                    errors.name.map((value,index) => {
                                        return (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                        )
                                    })
                                }
                                
                                
                            </Label>
                        </div>
                        
                       
                    
                        {!loading &&   <Button  className="float-right inline-block px-6 py-2.5 bg-indigo-400 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-indigo-800 hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase ">Submit</Button>}
                        {loading &&   <Button disabled={true} className="float-right px-6  disabled:text-white text-xs  font-medium disabled:bg-indigo-500  rounded-full btn btn-sm  loading">Loading</Button>}

                    </form>
                </div>
                </MainLayout>
              )
        }else{
            router.push(
                { pathname: "/", query: { message: 'You cant access this page',type:'error' } },"/?type=error"
               
            );
        }
        
    }

 
}


export default Add