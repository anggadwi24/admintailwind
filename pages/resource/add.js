
import MainLayout from "../../layouts/MainLayout"
import { useAuth } from '../../contexts/auth';
import React, { useState, useEffect } from 'react'
import Router, { useRouter, withRouter } from 'next/router';
import api from "../../lib/Api";
import Cookies from "js-cookie";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Label from "../../components/Label";
import Button from "../../components/Button";

const Add = () => {
    const breadcrumb = [{'name':'Resource','url':'/resource'},{'name':'Add','url':'/resource/add'}];
    const {user} = useAuth();
    const token = Cookies.get('token');
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);
    const router = useRouter();

  
    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
       
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post("/api/resource/store",{name,description})
        .then((res) =>{
            
            setLoading(false)
           
            if(res.data.statusCode == 200){
                router.push(
                    { pathname: "/resource", query: { message: "Resource successfuly created",success:true } },
                    "resource"
                  );
            }else{
                setError(res.data.message);
               
            }
        })

    }   
    
  return (
    <MainLayout  user={user} title="Resource - JUAPOS" page="Resource" breadcrumb={breadcrumb}>
          <div className='flex justify-between mb-4'>
        
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                Add Resource
            </h4>
        </div>
        <div className="px-4 py-3   bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={submitHandler}>
                <Label className="block text-sm mb-4 mt-4">
                    <span className="text-gray-700 dark:text-gray-400">
                        Resource
                    </span>
                    <Input 
                        type="text" 
                        className={ (error && error.name ? "border-red-400 bg-red-100 focus:border-red-700": "border-indigo-100 focus:border-indigo-400") + " block w-full md:w-1/2 mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                        placeholder="Insert name resource"
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
                        Description
                    </span>
                    <Textarea 
                        rows="4" 
                        className={ (error && error.name ? "border-red-400 bg-red-100 focus:border-red-700 focus:ring-red-700 ": "border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400") + "block p-2.5 text-sm mt-1 w-full  border  rounded-lg   focus:outline-none"}
                        placeholder="Insert description resource"
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
