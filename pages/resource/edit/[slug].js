import { useRouter } from "next/router";

import { useAuth } from "../../../contexts/auth";
import MainLayout from "../../../layouts/MainLayout";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import api from '../../../lib/Api';
import Cookies from 'js-cookie';



const Edit = (data) => {
    const router = useRouter();
    const {slug} = router.query;
    const breadcrumb = [{'name':'Resource','url':'/resource'},{'name':'Edit','url':`resource/edit/${slug}`}];
    const {user} = useAuth();
   
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const [name,setName] = useState(data.data.data.name);
    const [description,setDescription] = useState(data.data.data.description);
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const token = Cookies.get('token')
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post(`/api/resource/update/${slug}`,{name,description})
        .then((res) =>{
            
            setLoading(false)
           
            if(res.data.statusCode == 200){
                router.push(
                    { pathname: "/resource", query: { message: "Resource successfully updated",type:'success' } },"/resource?type=success"
                   
                  );
            }else{
                setErrors(res.data.message);
               
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
   
    if(data.data && data.data.statusCode != 200){
        router.push(
            { pathname: "/resource", query: { message:data.data.message,type:'error' } },"/resource?type=error"
           
          );
    }else{
       
        return (
            <MainLayout  user={user} title="Resource - JUAPOS" page="Resource" breadcrumb={breadcrumb}>
                 <div className='flex justify-between mb-4'>
        
                        <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
                            Edit
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
                                    className={ (errors && errors.name ? "border-red-400 bg-red-100 focus:border-red-700": "border-indigo-100 focus:border-indigo-400") + " block w-full md:w-1/2 mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    placeholder="Insert name resource"
                                    onChange={(e) => setName(e.target.value)}
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
                            <Label className="block text-sm mb-4 mt-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Description
                                </span>
                                <Textarea 
                                    rows="4" 
                                    className={ (errors && errors.name ? "border-red-400 bg-red-100 focus:border-red-700 focus:ring-red-700 ": "border-indigo-100 focus:ring-indigo-400 focus:border-indigo-400") + "block p-2.5 text-sm mt-1 w-full  border  rounded-lg   focus:outline-none"}
                                    placeholder="Insert description resource"
                                    value={description}
                                    disabled={loading == false ? '':true}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                    
                                </Textarea>
                                {errors && errors.description &&
                                    errors.description.map((value,index) => {
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
    
  
}
export async function getServerSideProps(context) {

    
    const token = context.req.cookies.token;
    const slug = context.params.slug;
    api.defaults.headers.Authorization = `Bearer ${token}`
    const url = '/api/resource/edit/'+slug;
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