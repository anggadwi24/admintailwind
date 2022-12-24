import { useRouter } from "next/router";
import Cookies from "js-cookie";
import api from "../../../lib/Api";
import MainLayout from "../../../layouts/MainLayout";
import { useAuth } from "../../../contexts/auth";
import { useState } from "react";
import Link from "next/link";


const Detail = (props) => {

    const router = useRouter();
    const {slug} = router.query;
    console.log(props);
    const {user,level} = useAuth();
    const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Detail','url':`/feature/detail/${slug}`}];
  
    const [error,setError] = useState([]);
    const [loading,setLoading] = useState(false);
   

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
                <div className="px-4 py-3 m-2  bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                                <Link href={`/feature/price/${props.data.feature.slug}/${value.slug}`} className="absolute top-0 right-0 ">
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
