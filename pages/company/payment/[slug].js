import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import api from "../../../lib/Api";
import { useAuth } from "../../../contexts/auth";
import MainLayout from "../../../layouts/MainLayout";
import Label from "../../../components/Label";
import Image from "next/image";
import Button from "../../../components/Button";
import Cookies from "js-cookie";

const Payment = (props) => {
   
  const router = useRouter();
  const {slug} = router.query;
  const { query } = useRouter();
  const [type,setType] = useState('success')
  const {user} = useAuth();
  const [showToast, setShowToast] = useState(false)
  const [message,setMessage] = useState();
  const breadcrumb = [{'name':'Company','url':'/company'},{'name':'Payment','url':`/company/payment/${slug}`}];

  const handleCloseToast = () =>{
    setShowToast(false);
    setMessage(null)
    router.push(`/company/payment/${slug}`)

    delete router.query.success;

}
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

  
  

    const submitHandler = (e) => {
        e.preventDefault();
        const token = Cookies.get('token')
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post(`/api/company/payment/${slug}`)
        .then((res) =>{
            if(res.data.statusCode === 200){
                router.push(
                    { pathname: `/company/${slug}`, query: { message: res.data.message,type:'success' } },`/company/${slug}?type=success`
                   
                );
            }else{
                setType('error')
                setMessage(res.data.message)
                setShowToast(true);
            }
        })

        
    }

  return (
    <MainLayout  user={user} title="Payment - JUAPOS" page="Payment" breadcrumb={breadcrumb}>
        <div className="flex justify-between">
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">Confirm payment</h4>
        </div>
        <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1 xl:col-span-1 lg:col-span-1 bg-white rounded-lg shadow-md  p-8">
                    <div className="flex  flex-wrap-reverse xl:flex-no-wrap lg:flex-no-wrap">
                        <div className="w-full lg:w-1/2 xl:w-1/2 ">
                            <Label className="text-gray-500 font-medium text-sm ">
                                Company
                            </Label>
                            <h6 className="text-dark font-medium text-md">
                                {props.data.data.name} - {props.data.data.category}
                            </h6>
                            <p className="block font-sm text-gray-500">
                                {props.data.data.address} ({props.data.data.kode_pos}), {props.data.data.city}, {props.data.data.province} 
                            </p>
                            <h6 className="text-dark font-medium text-md">
                                {props.data.data.email}
                            </h6>
                            <h6 className="text-dark font-medium text-md">
                                {props.data.data.phone}
                            </h6>
                        </div>
                        <div className="w-full lg:w-1/2 xl:w-1/2 ">
                            {!props.data.data.icon && 
                                <Image src='/assets/img/icon.png' alt={props.data.data.slug} height={100} width={100} className="w-24 h-24 mb-3 rounded-full"/>
                            }
                            {props.data.data.icon && 
                                <Image src={`https://kasirku.juastudio.com/uploads/company/${props.data.data.icon}`} alt={props.data.data.slug} height={100} width={100} className="text-right mx-auto mt-3 w-24 h-24 mb-3  rounded-full border border-gray-400"/>

                            }
                        </div>
                    </div>
                
                </div>
                <div className="col-span-2 md:col-span-1 xl:col-span-1 lg:col-span-1 bg-white rounded-lg shadow-md  p-8">
                    <Label className="text-gray-500 font-medium text-sm ">
                    Feature
                    </Label>
                    <h6 className="text-dark font-medium text-md">
                    INVOICE #{props.data.data.payment[0].invoice_no}
                    </h6>
                    <h6 className="text-dark font-medium text-md">
                    {props.data.data.fitur} - {props.data.data.price}
                    </h6>
                    <p className="block font-sm text-gray-500">
                        Expiry : {props.data.data.expiry_on} 
                    </p>
                    <p className="block font-sm text-gray-500 capitalize ">
                        Method : {props.data.data.payment[0].method} 
                    </p>
                    <h6 className="text-dark text-right font-medium text-md">
                    Amount : Rp. {props.data.data.payment[0].amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} 
                    </h6>
                    
                    <Button className="float-right mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-4 rounded-full uppercase">
                        Confirm
                    </Button>
                </div>

            </div>
        </form>
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


export async function getServerSideProps(context) {
    const token = context.req.cookies.token;
    const slug = context.query.slug;
 
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data: resp } = await api.get(`/api/company/detail/${slug}`)
     
     
    if (resp.statusCode === 200){
        if(resp.data.active === 'pending'){
            return {
                props:{
                    data:resp
                },
            }
        }else{
            return{
                redirect:{
                    destination:`/company?message=Company is not in status pending&type=error`,
                    permanent: false,
                }
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
export default Payment
