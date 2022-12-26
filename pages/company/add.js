
import MainLayout from '../../layouts/MainLayout'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../lib/Api';
import Cookies from 'js-cookie';
import { useState } from 'react';
import useSWR, { mutate } from "swr";
import axios from "axios";
import { select } from '@material-tailwind/react';

const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)


const Add = () => {
    const router = useRouter();
    const {user,level} = useAuth();
    const token = Cookies.get('token')
    const [province,setProvince] = useState('default');
    const [city,setCity] = useState('default')
    const [selectCity,setSelectCity] = useState([]);
    const breadcrumb = [{'name':'Company','url':'/company'},{'name':'Add','url':'/company/add'}];

    const {data:provinces,error} = useSWR([`https://kasirku.juastudio.com/api/province`,token],fetcher);
    // console.log(provinces)
    const handleProvince = async  (event) =>{
       
        setProvince(event.target.value);
      
        api.defaults.headers.Authorization = `Bearer ${token}`
      
        var country_select = document.querySelector("#province");
        var key = country_select.options[country_select.selectedIndex].getAttribute('index');
       
      
        setSelectCity([provinces.data[key].city])
       
        
      
        
    }
    
  
  return (
        <MainLayout breadcrumb={breadcrumb} user={user} page="Company" title="Company - JUAPOS">
            <div className='flex justify-between mb-4'>  
                <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">Add Company</h4>
            </div>
           
            <form className="px-4 py-3   bg-white rounded-lg shadow-md dark:bg-gray-800  ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Name
                        </Label>
                        <Input className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Jane"/>
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Email
                        </Label>
                        <Input className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Jane"/>
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Provinsi
                        </Label>
                        <Select id="province" onChange={  handleProvince}  value={province} className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                            <option disabled={true} value="default">{!provinces ? 'Loading..':'Select provinces'}</option>
                            {provinces && provinces.data.length > 0 && 
                                provinces.data.map( (value,index) => {
                                    return (
                                        <option value={value.id} index={index} key={value.id}>{value.name}</option>
                                    )
                                })
                            }
                        </Select>
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            City
                        </Label>
                        <Select id="province" onChange={  (e) => setCity(e.target.value)}  value={city} className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                            <option disabled={true} value="default">Select city</option>
                            { selectCity[0] && selectCity[0].length > 0 && 
                                selectCity[0].map( (value,index) => {
                                   
                                    return (
                                        <option value={value.id} index={index} key={value.id}>{value.name}</option>
                                    )
                                })
                            }
                            {selectCity.length === 0 && 
                                <option disabled={true} value="null">Select province first</option>
                            }
                        </Select>
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Address
                        </Label>
                        <Input className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Jane"/>
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Post Code
                        </Label>
                        <Input className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Jane"/>
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                </div>
            </form>
           
           
        </MainLayout>
  )
}

export default Add