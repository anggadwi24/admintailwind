import { useRouter } from "next/router";
import Cookies from "js-cookie";
import api from "../../../lib/Api";
import MainLayout from "../../../layouts/MainLayout";
import { useAuth } from "../../../contexts/auth";
import { useEffect, useState } from "react";
import Link from "next/link";


const Detail = (props) => {

    const router = useRouter();
    const {slug} = router.query;
    console.log(props);
    const {user,level} = useAuth();
    const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Detail','url':`/feature/detail/${slug}`}];
  
    const [error,setError] = useState([]);
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState(null);
    const [showToast,setShowToast] = useState(false);
    const [type,setType] = useState('success');
    const { query } = useRouter();
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
        router.push(`/feature/detail/${slug}`)

        delete router.query.success;

   }
    if(props.data.statusCode !== 200){
        router.push(
            { pathname: "/feature", query: { message: props.data.message,type:'error' } },"/feature"
           
          );
    }

    if(level !== 'admin'){
        router.push(
            { pathname: "/", query: { message: 'You cant access this page',type:'error' } },"/"
           
          );
    }

  return (
    <MainLayout breadcrumb={breadcrumb}  user={user} title="Resource - JUAPOS" page="Resource">
        <div className='flex justify-between mb-0'>
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                Detail Resource
            </h4>
        </div>
        <div className="flex  flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
            <div className="w-full  sm:w-auto md:w-full lg:w-3/4 xl:w-3/4 ">
                <div className="relative px-4 py-3 m-2  bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h1 className="text-gray-800 text-3xl font-bold ">{props.data.feature.name}</h1>
                    <p className="text-gray-500 mt-0 text-sm font-thin">
                        {props.data.feature.description}
                    </p>
                 
                    {props.data.resource.length > 0 && 
                                    <ul role="list" className=" grid  md:grid-cols-3 sm-grid-cols-1  my-4">
                                        
                                        {props.data.resource.map( (resource,index) => {
                                                return (
                                                   
                                                    <li className={'flex space-x-3 my-3 ' + (resource.value == 'n' ? 'line-through decoration-gray-500' : '')} key={resource.id}>
                                        
                                                        <svg aria-hidden="true" className={"flex-shrink-0 w-5 h-5 " + (resource.value == 'n' ? 'text-gray-400 dark:text-gray-500' : ' text-blue-600 dark:text-blue-500')} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>{resource.description}</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"><b>{ resource.value == 'n' ? null :resource.capacity ?  resource.capacity : 'Unlimited'  }</b> {resource.resource}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                        
                                        
                                        
                                    </ul>
                                    }
                <Link className="absolute bottom-3 right-3 " href={`/feature/resource/edit/${slug}`}>Edit Resource</Link>
                   
                </div>
            </div>
            <div className="w-full sm:w-full lg:w-1/4 xl:w-1/4  ">
                {props.data.price && props.data.price.length > 0 && 
                    props.data.price.map( (value,index) => {
                        return (
                            <div key={value.slug} className="relative px-4 py-10 m-2  bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div className="flex items-baseline text-gray-900 dark:text-white">
                                         <span className="text-lg font-semibold">Rp.</span>
                                         <span className="text-2xl font-extrabold tracking-tight">{value.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span>
                                         <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">/{value.duration}</span>
                                        
                                </div>
                                <Link href={`/feature/price/${props.data.feature.slug}/${value.slug}`} className="absolute top-2 right-2 ">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>

                                </Link>
                            </div>

                        )
                    })
                    
                }
               
            </div>

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
}

export async function getServerSideProps(context) {

    
    const token = context.req.cookies.token;
    const slug = context.params.slug;
    api.defaults.headers.Authorization = `Bearer ${token}`
    const url = `/api/feature/detail/${slug}`;
    const { data: feature } = await api.get(url)
   
   
    if (feature){
        return {
            props:{
                data:feature
            },
        }
    } 

  
  
}
export default Detail
