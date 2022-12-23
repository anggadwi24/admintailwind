import { useRouter } from "next/router";
import Cookies from "js-cookie";
import api from "../../../lib/Api";
import MainLayout from "../../../layouts/MainLayout";
import { useAuth } from "../../../contexts/auth";
import { useState } from "react";


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
        <div className="flex flex-wrap">
            <div className="w-3/4">
                <div className="px-4 py-3 m-2  bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h1 className="text-gray-800 text-3xl font-bold ">{props.data.feature.name}</h1>
                    <p className="text-gray-500 mt-0 text-sm font-thin">
                        {props.data.feature.description}
                    </p>
                 
                    {props.data.resource.length > 0 && 
                                    <ul role="list" className=" grid grid-cols-3 my-4">
                                        
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
            <div className="w-1/4  ">
                <div className="px-4 py-3 m-2  bg-white rounded-lg shadow-md dark:bg-gray-800">

                </div>
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
