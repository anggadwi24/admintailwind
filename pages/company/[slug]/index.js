import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import api from "../../../lib/Api";


const Detail = (props) => {
    console.log(props.data)
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