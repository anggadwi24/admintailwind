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

const Edit = (props) => {
    
    const {user,level} = useAuth();
    const router = useRouter();
    const {slug} = router.query;
    const token = Cookies.get('token');
    const { query } = useRouter();
   
    const [loading,setLoading] = useState(false);
    const [errors,setError] = useState([]);
    const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Detail','url':`/feature/detail/${slug}`},{'name':'Edit Resource',url:`/feature/resource/edit/${slug}`}];
     
    // const [resource,setResource] = useState([props.data.record[0].slug]);
    const [values,setValues] = useState(['n']);
    const [capacity,setCapacity] = useState(['']);

   
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
        
        updateState(props)

    },[props])

   
    const updateState = (props) => {
        if(props.data.record.length > 0 ){
            let newVal  = [];
            let newCap = [];
            for(let a = 0;a < props.data.record.length; a++){
               
                newVal = [...newVal,props.data.record[a].value];
                if(props.data.record[a].capacity === null){
                    newCap = [...newCap,''];

                }else{
                    newCap = [...newCap,props.data.record[a].capacity];

                }

              
            }
            
            setValues(newVal)
            setCapacity(newCap)

            
       }
    }
   
   const handleState = (index,e) => {
        
        const newItems = [...values];
        
        if(e.target.checked){
            newItems[index] = 'y';
        }else{
            newItems[index]  = 'n';
        }
       

        setValues(newItems)
       

   }
  
   const handleCapacity = (index,e) => {
        const newItems = [...capacity];
            
       
        newItems[index] = e.target.value;
       
    

        setCapacity(newItems)
   }
   
   const handleCloseToast = () =>{
        setShowToast(false);
        setMessage(null)
        router.push(`/feature/resource/add/${slug}`)

        delete router.query.success;

   }
    

  
    
    const {data,error,mutate} = useSWR([`https://kasirku.juastudio.com/api/feature/edit/${slug}`,token],fetcher);
    const submitHandler = async (e) => {
        e.preventDefault();
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post(`/api/feature/store/resource/${slug}`,{value:values,capacity:capacity})
        .then((res) =>{
            
            setLoading(false)
           
            if(res.data.statusCode == 200){
                router.push(
                    { pathname: `/feature/detail/${slug}`, query: { message: "Feature price successfuly created",type:'success' } }, `/feature/detail/${slug}`
                   
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
                    Edit Resource
                    </h4>
            
                </div>
                             
                <div className="px-4 py-3 mt-4  bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={submitHandler}>
                            {props.data.statusCode == 200 && props.data.record.length > 0 && 
                                <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 gap-6">
                                    {props.data.record.map((value,index) => {
                                        

                                        return (
                                            
                                            <li key={value.slug}>
                                                <input type="checkbox"  disabled={loading == false ? '':true} id={value.slug} value="y" className="hidden peer" defaultChecked={values[index] == 'y' ? true : false} onChange={ (e) => handleState(index,e)} />
                                                <label htmlFor={value.slug} className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                    <div className="block">
                                                    
                                                        <div className="w-full text-lg font-semibold">{value.name}</div>
                                                        <div className="w-full text-sm">{value.description}</div>
                                                        <Input 
                                                            type="number" 
                                                            className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                                                            value={capacity[index]}
                                                            onChange={(e) => handleCapacity(index,e)}
                                                            placeholder="Insert capacity"  
                                                            disabled={loading == false ? '':true}  
                                                        >
                                                        </Input>
                                                    </div>
                                                </label>
                                            </li>
                                        )
                                       
                                    })}
                                </ul>
                            }
                           
                        
                    
                       
                    
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

export async function getServerSideProps(context) {

    
    const token = context.req.cookies.token;
    const slug = context.params.slug;
    api.defaults.headers.Authorization = `Bearer ${token}`
    const url = `/api/feature/resource/detail/${slug}`
    const { data: resource } = await api.get(url)
   
   
    if (resource){
        return {
            props:{
                data:resource
            },
        }
    } 

  
  
}
export default Edit