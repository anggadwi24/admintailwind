import Cookies from "js-cookie";
import { useAuth } from "../../contexts/auth"
import MainLayout from "../../layouts/MainLayout"
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "@nextui-org/react";

const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)

const Company = () => {
    const router = useRouter();
    const breadcrumb = [{'name':'Company','url':'/company'}];
    const [page,setPage] = useState(router.query ?.page || 1)
    const {user,level} = useAuth();
    const token = Cookies.get('token');
    const {data,error,mutate} = useSWR([`https://kasirku.juastudio.com/api/company?page=${page}`,token],fetcher);
    const [message,setMessage] = useState(null);
    const [success,setSuccess] = useState(false);
    const [showToast,setShowToast] = useState(false);
    const { query } = useRouter();
    const [type,setType] = useState('success')
    
    if(success){
        mutate();
    }
    if(error){
        setMessage(error['message'])
        setShowToast(true);
        setType('error');
    }
    useEffect( () => {
       
        if(router.query.type){
            if(router.query.type == 'success'){
               setType('success');
                
            }else{
                setType('error');

            }
            setMessage(router.query.message)
            setShowToast(true);
        }
        router.push({pathname :'/company',query: {...query,page}})

    },[page])
    
    if(!data){
        if(!data){
            return (
                <MainLayout breadcrumb={breadcrumb} user={user} title="Company - Jua POS" page="Company">
                    <div className="flex justify-center items-center py-5">
                        <svg aria-hidden="true" className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </MainLayout>
            )
               
            
        }
    }
    if(data && data.statusCode != 200){
        router.push(
            { pathname: "/", query: { message: data.message,type:'error' } },"/"
           
          );
    }
    const handleCloseToast = () =>{
        setShowToast(false);
        setMessage(null)
        router.push(`/company?page=${page}`)

        delete router.query.success;

   }
  return (
    
    <MainLayout breadcrumb={breadcrumb} user={user} title="Company - Jua POS" page="Company">
        <div className='flex justify-between mb-4'>  
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
            Data Company
            </h4>
            <Link href="/company/add" className='btn btn-primary'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>

            </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 sm-grid-cols-1 gap-4 mb-4">
            {data.data.data && data.data.data.length > 0 && 
                data.data.data.map((value,index) => {
                    return ( 
                        <div key={value.slug} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4">
                                <Dropdown>
                                    <Dropdown.Trigger flat="true" color='light'> 
                                        <svg className="w-6 h-6 cursor-pointer" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu aria-label="Static Actions">
                                        <Dropdown.Item key="new">Edit</Dropdown.Item>
                                     
                                        <Dropdown.Item key="delete" withDivider color="error">
                                        Delete 
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                {!value.icon && <Image src='/assets/img/icon.png' alt={value.name} height={100} width={100} className="w-24 h-24 mb-3 rounded-full shadow-lg"/> }
                                {value.icon && <Image src={`https://kasirku.juastudio.com/uploads/company/${value.icon}`} alt={value.name} height={100} width={100} className="w-24 h-24 mb-3 rounded-full shadow-lg"/> }
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{value.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{value.category}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex" title="Expiry">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>

                                    <small className="ml-2">{value.expiry_on ? value.expiry_on: '-'}</small>
                                </span>

                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <Link href={`/company/${value.slug}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detail</Link>
                                   
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {showToast &&  
        <div id="toast-success" className="flex absolute top-20 right-5 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                
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
}

export default Company
