import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import api from "../../../lib/Api";
import Image from "next/image";
import Moment from "moment"
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

const Detail = (props) => {
    const data = props.data.data
    const tabs = [
        {
          label: "HTML",
          value: "html",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "React",
          value: "react",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
     
        {
          label: "Vue",
          value: "vue",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're 
          constantly trying to express ourselves and actualize our dreams.`,
        },
     
        {
          label: "Angular",
          value: "angular",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
     
        {
          label: "Svelte",
          value: "svelte",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're 
          constantly trying to express ourselves and actualize our dreams.`,
        },
      ];
    
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
            <div className="flex flex-col lg:flex-row mb-4 p-8">
                <div className="w-full sm:w-1/12 lg:w-1/12  ">
                    {!data.icon && <Image src='/assets/img/icon.png' alt={data.name} height={100} width={100} className="w-24 h-24 mb-3 rounded-full shadow-lg"/> }
                    {data.icon && <Image src={`https://kasirku.juastudio.com/uploads/company/${data.icon}`} alt={data.name} height={80} width={80} className="w-15 h-15 mb-3 mx-auto  rounded-full shadow-lg"/> }
                </div>
                <div className="w-full md:w-11/12 lg:w-11/12 ">
                    <div className="flex flex-col lg:flex-row xl:flex-row justify-between">
                        <div className="lg:pl-3 text-center lg:text-left">
                            <h6 className="text-md font-medium">{data.name}</h6>
                            <h6 className="text-sm font-normal">{data.email}</h6>
                            <h6 className="text-sm font-normal">{data.phone}</h6>
                            <p className="text-sm font-thin">{data.address} ({data.kode_pos}), {data.city}, {data.province}</p>
                        </div>
                        <div className="lg:border-r-2">

                        </div>
                        <div className=" text-center lg:text-left mt-3 lg:mt-0">
                            <h6 className="text-sm font-normal"> {data.fitur} / {data.price}</h6>
                            <h6 className="text-sm font-normal capitalize"> {data.active}</h6>
                            <h6 className="text-sm font-normal">{Moment(data.feature.created_at).format('YYYY-MM-DD HH:mm')} - {Moment(data.expiry_on).format('YYYY-MM-DD HH:mm')}</h6>
                           
                          


                        </div>
                    </div>
                   


                </div>
               
            </div>
        </div>
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Tabs value={0}>
                <TabsHeader className="bg-gray-100">
                    <Tab value={0} index={0} title={`Detail `+data.name}>  
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>   
                    </Tab>
                    <Tab  value={1} index={1} title={`Payment ${data.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                    </Tab>
                    <Tab  value={2} index={2} title={`Report ${data.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>

                    </Tab>
                    
                    <Tab  value={3} index={3} title={`User ${data.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </Tab>
                </TabsHeader>
                <TabsBody>
                    <TabPanel index={0} value={0}>
                        INI USER
                    </TabPanel>
                    <TabPanel value={1}>
                        INI USER 1
                    </TabPanel>
                    <TabPanel  value={2}>
                        INI USER 2
                    </TabPanel>
                    <TabPanel value={3}>
                        INI USER 3
                    </TabPanel>
                  
                </TabsBody>
            </Tabs>
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