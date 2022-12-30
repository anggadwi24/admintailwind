import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import api from "../../../lib/Api";
import Image from "next/image";


const Detail = (props) => {
    const data = props.data.data
    console.log(data)
    
    const {user} = useAuth();
    const router = useRouter();
    const {slug} = router.query
    const breadcrumb = [{'name':'Company','url':'/company'},{'name':'Detail','url':`/company/${slug}`}];

    const [type,setType] = useState('success')
    const [showToast,setShowToast] = useState(false)
    const [message,setMessage] = useState(null)

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
        router.push(`/company/${slug}`)
    
        delete router.query.success;
    
    }
  return (
    <MainLayout breadcrumb={breadcrumb} user={user} title="Detail Company - JUAPOS" page="Company">
        <div className="flex justify-between">
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">Detail</h4>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-no-wrap mb-4 p-8">
                <div className="w-full md:w-1/12 lg:w-1/12  ">
                    {!data.icon && <Image src='/assets/img/icon.png' alt={data.name} height={100} width={100} className="w-24 h-24 mb-3 rounded-full shadow-lg"/> }
                    {data.icon && <Image src={`https://kasirku.juastudio.com/uploads/company/${data.icon}`} alt={data.name} height={80} width={80} className="w-15 h-15 mb-3 rounded-full shadow-lg"/> }
                </div>
                <div className="w-full md:w-11/12 lg:w-11/12 ">
                    <div className="flex flex-col lg:flex-row xl:flex-row justify-between">
                        <div className="pl-3">
                            <h6 className="text-md font-medium">{data.name}</h6>
                            <h6 className="text-sm font-normal">{data.email}</h6>
                            <h6 className="text-sm font-normal">{data.phone}</h6>
                            <p className="text-sm font-thin">{data.address} ({data.kode_pos}), {data.city}, {data.province}</p>
                        </div>
                        <div className="lg:border-r-2">

                        </div>
                        <div className="  ">
                            <h6 className="text-sm font-normal"> {data.fitur} / {data.price}</h6>
                            <h6 className="text-sm font-normal capitalize"> {data.active}</h6>
                            <h6 className="text-sm font-normal">{data.feature.created_at} - {data.expiry_on}</h6>
                           
                          


                        </div>
                    </div>
                   


                </div>
               
            </div>
        </div>
    </MainLayout>
  )
}


export async function getServerSideProps(context) {
    const token = context.req.cookies.token;
    const slug = context.query.slug;
 
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data: resp } = await api.get(`/api/company/detail/${slug}`)
     
     
    if (resp.statusCode === 200){
        if(resp.data.active === 'pending'){
           
            return{
                redirect:{
                    destination:`/company/payment/${slug}?message=Please complete the payment&type=error`,
                    permanent: false,
                }
            }
        }else{
            return {
                props:{
                    data:resp
                },
            }
        }
        
    }else{
        return{
            redirect:{
                destination:`/company?message=${resp.message}&type=error`,
                permanent: false,
            }
        }
    }

   
  }
export default Detail