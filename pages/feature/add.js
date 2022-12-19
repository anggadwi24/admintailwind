import MainLayout from "../../layouts/MainLayout"
import { useAuth } from '../../contexts/auth';
import React, { useState, useEffect } from 'react'
import api from "../../lib/Api";
import Cookies from "js-cookie";
import Router, { useRouter } from 'next/router';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Textarea from "../../components/Textarea";


const Add = () => {
    const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Add','url':'/feature/add'}];
    const {user,level} = useAuth();
    const router = useRouter();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [error,setError] = useState([]);
    const [loading,setLoading] = useState(false);
    const token = Cookies.get('token');
    
    if(level !== 'admin'){
        router.push(
            { pathname: "/", query: { message: "You cant access this page",type:'error' } },"/dashboard/type=error"
           
          );
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        setLoading(true);
       
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post("/api/feature/store",{name,description})
        .then((res) =>{
            console.log(res)
            setLoading(false)
           
            if(res.data.statusCode == 200){
                router.push(
                    { pathname: `/feature/price/add/${res.data.slug}`, query: { message: "Feature successfuly created",type:'success' } },`/feature/price/add/${res.data.slug}?type=success`
                   
                  );
            }else{
                setError(res.data.message);
               
            }
        })
        
    }
    return (
            <MainLayout  user={user} title="Feature - JUAPOS" page="Feature" breadcrumb={breadcrumb}>
                <div className='flex justify-between mb-0'>

                    <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                    Add Feature
                    </h4>
            
                </div>
               
                <ol className="flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4" >
                    <li className="flex items-center justify-center text-blue-600">
                        <span
                        className="h-6 w-6 rounded bg-blue-50 text-center text-[10px] font-bold leading-6"
                        >
                        1
                        </span>

                        <span className="ml-2"> Feature </span>
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
                        <Label className="block text-sm mb-4 mt-4">
                            <span className="text-gray-700 dark:text-gray-400">
                                Feature name
                            </span>
                            <Input 
                                type="text" 
                                className={ (error && error.name ? "border-red-400 bg-red-100 focus:border-red-700": "border-indigo-100 focus:border-indigo-400") + " block w-full md:w-1/2 mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                placeholder="Insert feature name"
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading == false ? '':true}
                                value={name}

                                
                            >
                            
                            </Input>
                            {error && error.name &&
                                error.name.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                            
                            
                        </Label>
                        <Label className="block text-sm mb-4 mt-4">
                            <span className="text-gray-700 dark:text-gray-400">
                                Description feature
                            </span>
                            <Textarea 
                                rows="4" 
                                className={ (error && error.name ? "border-red-400 bg-red-100 focus:border-red-700 focus:ring-red-700 ": "border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400") + "block p-2.5 text-sm mt-1 w-full  border  rounded-lg   focus:outline-none"}
                                placeholder="Insert description feature"
                                value={description}
                                disabled={loading == false ? '':true}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                                
                            </Textarea>
                            {error && error.description &&
                                error.description.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </Label>
                    
                        {!loading &&   <Button  className="float-right inline-block px-6 py-2.5 bg-indigo-400 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-indigo-800 hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase ">Submit</Button>}
                        {loading &&   <Button disabled={true} className="float-right px-6  disabled:text-white text-xs  font-medium disabled:bg-indigo-500  rounded-full btn btn-sm  loading">Loading</Button>}

                    </form>
                </div>
        </MainLayout>
    )
}

export default Add