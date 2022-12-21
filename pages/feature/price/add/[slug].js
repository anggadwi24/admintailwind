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
import Select from "../../../../components/Select";
import api from "../../../../lib/Api";





const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)

const Add = () => {
    const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Add','url':'/feature/add'}];
    const {user,level} = useAuth();
    const router = useRouter();
    const {slug} = router.query;
    const token = Cookies.get('token');
    const { query } = useRouter();
   
    const [loading,setLoading] = useState(false);
    const [errors,setError] = useState([]);
    const [layout,setLayout] = useState([1]);

    const [message,setMessage] = useState(null);
    const [showToast,setShowToast] = useState(false);
    const [type,setType] = useState('success');
    useEffect( () => {
      
        if(router.query.type){
           
            if(router.query.type == 'success'){
               setType('success');
                
            }else{
                setType('error');

            }
            setMessage(query['message'])
            setShowToast(true);
        }
       

    })
   const handleCloseToast = () =>{
        setShowToast(false);
        setMessage(null)
        router.push(`/feature/price/add/${slug}`)

        delete router.query.success;

   }
    
    const handleIncrement = () =>{
       
        setLayout([...layout,1]);
        
    }

    const handleDecrement = ()=>{
       
        setLayout(layout.splice(layout.length-1,1))
        

    }
  
    
    const {data,error,mutate} = useSWR([`https://kasirku.juastudio.com/api/feature/edit/${slug}`,token],fetcher);
    const submitHandler = async (e) => {
        e.preventDefault();
        const nameArr  = [];
        const priceArr = [];
        const durationArr = [];
        const discountArr = [];
        for (let i = 0; i <  document.getElementsByName('name[]').length; i++) {
           
            nameArr.push(document.getElementsByName('name[]')[i].value)
            priceArr.push(document.getElementsByName('price[]')[i].value)
            durationArr.push(document.getElementsByName('duration[]')[i].value)
            discountArr.push(document.getElementsByName('discount[]')[i].value)

        }
 

        
       

       
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post(`/api/feature/store/price/${slug}`,{name:nameArr,duration:durationArr,price:priceArr,discount:discountArr})
        .then((res) =>{
            
            setLoading(false)
           
            if(res.data.statusCode == 200){
                router.push(
                    { pathname: `/feature/resource/add/${res.data.slug}`, query: { message: "Feature price successfuly created",type:'success' } },`/feature/resource/add/${res.data.slug}?type=success`
                   
                  );
            }else{
                setError(res.data.message);
               
            }
        })

        
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
                <div className="px-4 py-3  flex flex-row-reverse">
                    <Button  onClick={ () => handleIncrement()} className=" inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800  focus:outline-none focus:ring-0 transition duration-150 uppercase ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                    {layout.length > 1 && 
                    <Button  onClick={ () => handleDecrement()} className=" inline-block px-6 py-2.5 mx-4 bg-yellow-400 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-yellow-800 hover:shadow-lg focus:bg-yellow-800  focus:outline-none focus:ring-0 transition duration-150 uppercase ">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </Button>
                    }
                </div>
                <div className="px-4 py-3   bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={submitHandler}>
                        
                        {layout.map( (value,index) => {
                           
                            return (
                                <div key={index}>
                                <div className="flex flex-no-wrap">
                                    <Label className="w-2/5 block text-sm mb-4 mt-4">
                                        <span className="text-gray-700 dark:text-gray-400">
                                            Name
                                        </span>
                                        <Input 
                                            type="text" 
                                            className={ (errors[`name.${index}`] ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') +  "  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                                            name="name[]"
                                            key={index}
                                            placeholder="Insert price name"

                                            disabled={loading == false ? '':true}
                                            
                                        >
                                        </Input>
                                        {errors && errors[`name.${index}`] &&
                                            errors[`name.${index}`].map((value,index) => {
                                                return (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                                )
                                            })
                                        }
                                    </Label>
                                    <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                                        <span className="text-gray-700 dark:text-gray-400">
                                            Duration
                                        </span>
                                        <Select 
                                            className={ (errors[`duration.${index}`] ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') +  "  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                                            
                                            disabled={loading == false ? '':true}
                                            name="duration[]"
                                            
                                        >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                        </Select>
                                    </Label>
                                    {errors && errors[`duration.${index}`] &&
                                        errors[`duration.${index}`].map((value,index) => {
                                            return (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex flex-no-wrap">
                                    <Label className="w-2/5 block text-sm mb-4 mt-4">
                                        <span className="text-gray-700 dark:text-gray-400">
                                            Price
                                        </span>
                                        <Input 
                                            type="number" 
                                            className={ (errors[`price.${index}`] ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') + " block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                                            name="price[]"
                                            placeholder="Insert price"
                                          
                                            disabled={loading == false ? '':true}
                                          
                                        >
                                        </Input>
                                        {errors && errors[`price.${index}`] &&
                                            errors[`price.${index}`].map((value,index) => {
                                                return (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                                )
                                            })
                                        }
                                    </Label>
                                    <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                                        <span className="text-gray-700 dark:text-gray-400">
                                            Discount
                                        </span>
                                        <Input 
                                            type="number" 
                                            className={ (errors[`discount.${index}`] ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') + " block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                                            
                                            placeholder="Insert discount"
                                            name="discount[]"
                                            disabled={loading == false ? '':true}
                                           
                                        >
                                        </Input>
                                        {errors && errors[`discount.${index}`] &&
                                        errors[`discount.${index}`].map((value,index) => {
                                            return (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                            )
                                        })
                                    }
                                    </Label>
                                </div>
                            </div>
                            )
                        })}
                       
                    
                        {!loading &&   <Button  className="float-right inline-block px-6 py-2.5 bg-indigo-400 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-indigo-800 hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase ">Submit</Button>}
                        {loading &&   <Button disabled={true} className="float-right px-6  disabled:text-white text-xs  font-medium disabled:bg-indigo-500  rounded-full btn btn-sm  loading">Loading</Button>}

                    </form>
                </div>
                {showToast &&  <div id="toast-success" className="flex absolute top-20 right-5 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                
                    <div className={(type == 'success' ? " text-green-500 bg-green-100 " : " text-red-500 bg-red-200 ") + "inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg dark:bg-green-800 dark:text-green-200"}>
                
                        {type == 'success' && <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> }
                        {type == 'error' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        }
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
        }else{
            router.push(
                { pathname: "/", query: { message: 'You cant access this page',type:'error' } },"/?type=error"
               
            );
        }
        
    }

 
}


export default Add