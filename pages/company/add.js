
import MainLayout from '../../layouts/MainLayout'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import api from '../../lib/Api';
import apiv1 from '../../lib/apiv1';

import Cookies from 'js-cookie';
import { useState } from 'react';
import useSWR, { mutate } from "swr";
import axios from "axios";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react';
import Autocomplete from '../../components/Autocomplete';
import Button from '../../components/Button';


const fetcher = (url,token) => axios.get(url,{headers:{ Authorization: "Bearer " + token } }).then(res => res.data)


const Add = () => {
    const router = useRouter();
    const {user,level} = useAuth();
    const token = Cookies.get('token')
    const [province,setProvince] = useState('default');
    const [city,setCity] = useState('default')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [postcode, setPostcode] = useState('')
    const [category,setCategory] = useState('')
    const [feature,setFeature] = useState('default')
    const [price,setPrice] = useState('default')
    const [method,setMethod] = useState('default')
    const [referal,setReferal] = useState('')
    const [icon,setIcon] = useState(null)

    const [selectCity,setSelectCity] = useState([]);
    const [selectPrice,setSelectPrice] = useState([]);
    const [loading,setLoading] = useState(false)
    const [validation,setValidations] = useState([])
    const [errors,setErrors] = useState(null)

    const breadcrumb = [{'name':'Company','url':'/company'},{'name':'Add','url':'/company/add'}];
    const {data:categories,errorc} = useSWR([`https://kasirku.juastudio.com/api/category`,token],fetcher);
   
    
   
    

    
     
    const {data:provinces,error} = useSWR([`https://kasirku.juastudio.com/api/province`,token],fetcher);
    const {data:features,errorf} = useSWR([`https://kasirku.juastudio.com/api/featureall`,token],fetcher);

    

   
    const handleProvince = async  (event) =>{
       
        setProvince(event.target.value);
      
       
      
        var country_select = document.querySelector("#province");
        var key = country_select.options[country_select.selectedIndex].getAttribute('index');
       
      
        setSelectCity([provinces.data[key].city])
       
        
      
        
    }
    const submitHandle = (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        apiv1.defaults.headers.Authorization = `Bearer ${token}`
        apiv1
        .post(`/api/company/add`,{name,email,phone,category,address,kode_pos:postcode,province,city,feature,duration:price,method,icon,referal})
        .then((res) =>{
            console.log(res.data.statusCode)
            if(res.data.statusCode === 200){

            }else if(res.data.statusCode === 422){
                setValidations(res.data.message)
               
                
            }else{
                setErrors(res.data.message)
            }
        })

    }
    
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
    
          setIcon(event.target.files[0]);
          
        }
      };
    
    const handleFeature = (event) => {
        setFeature(event.target.value)
        var country_select = document.querySelector("#feature");
        var key = country_select.options[country_select.selectedIndex].getAttribute('index');
        setPrice('default')
      
        setSelectPrice([features.data[key].price])
    }

    
  
  return (
        <MainLayout breadcrumb={breadcrumb} user={user} page="Company" title="Company - JUAPOS">
            <div className='flex justify-between mb-4'>  
                <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">Add Company</h4>
            </div>
           
            <form onSubmit={submitHandle}  encType="multipart/form-data">
                <div className='px-4 py-3  bg-white rounded-lg shadow-md dark:bg-gray-800'>

              
                    <h4 className="mb-8 text-lg font-semibold text-dark uppercase dark:text-gray-300">Data Company</h4>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Company Name
                            </Label>
                            <Input value={name} onChange={ (e) => setName(e.target.value)} className={  (validation && validation.name  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"   block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Company Name"/>
                            
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Category
                            </Label>
                            {categories && categories.record.length > 0 && 
                                <Autocomplete options={categories.record} 
                                value={category}
                                onChange={setCategory}
                            />
                            }
                            
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Email
                            </Label>
                            <Input value={email} onChange={ (e) => setEmail(e.target.value)} className={(validation && validation.email  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="company@gmail.com"/>
                        
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Phone
                            </Label>
                            <Input value={phone} onChange={ (e) => setPhone(e.target.value)} className={ (validation && validation.phone  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="6288888888"/>
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                       
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Provinsi
                            </Label>
                            <Select id="province" onChange={  handleProvince}  value={province} className={(validation && validation.province  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="default">{!provinces ? 'Loading..':'Select provinces'}</option>
                                {provinces && provinces.data.length > 0 && 
                                    provinces.data.map( (value,index) => {
                                        return (
                                            <option value={value.id} index={index} key={value.id}>{value.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                City
                            </Label>
                            <Select onChange={  (e) => setCity(e.target.value)}  value={city} className={(validation && validation.city  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
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
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Address
                            </Label>
                            <Textarea value={address} onChange={ (e) => setAddress(e.target.value)} className={ (validation && validation.address  ? 'border-red-100 focus:ring-red-400 ':' border-indigo-100 focus:ring-indigo-400' ) +"   focus:border-indigo-400 block p-2.5 text-sm mt-1 w-full  border  rounded-lg   focus:outline-none"} id="grid-first-name" placeholder='Company address'>
                                
                            </Textarea>
                            
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Post Code
                            </Label>
                            <Input value={postcode} onChange={ (e) => setPostcode(e.target.value)} className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="number" placeholder="XXXXX"/>
                            
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="block w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <span className="sr-only">Choose Icon</span>
                            <input type="file" onChange={uploadToClient} accept="image/jpg,image/png,image/jpeg" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </label>
                    </div> 
                </div>
                <div className='px-4 py-3 mt-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
                    <h4 className="mb-8 text-lg font-semibold text-dark uppercase dark:text-gray-300">Data Feature</h4>
                    <div className="flex flex-wrap -mx-3 mb-6">
                       
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Feature
                            </Label>
                            <Select id="feature" onChange={  handleFeature}  value={feature} className={ (validation && validation.feature  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"   block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="default">{!features ? 'Loading..':'Select Feature'}</option>
                                {features && features.data.length > 0 && 
                                    features.data.map( (value,index) => {
                                        return (
                                            <option value={value.slug} index={index} key={value.slug}>{value.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Duration
                            </Label>
                            <Select  onChange={  (e) => setPrice(e.target.value)}  value={price} className={ (validation && validation.duration  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="default">Select price</option>
                                { selectPrice[0] && selectPrice[0].length > 0 && 
                                    selectPrice[0].map( (value,index) => {

                                        return (
                                            <option value={value.slug} index={index} key={value.slug}>{value.name} - {value.discount > 0 ? (value.price-value.discount).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : value.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }</option>
                                        )
                                    })
                                }
                                {selectPrice.length === 0 && 
                                    <option disabled={true} value="null">Select price first</option>
                                }
                            </Select>
                        
                      
                        </div>
                       
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Method
                            </Label>
                            <Select  onChange={ (e)=> setMethod(e.target.value)}  value={method} className={ (validation && validation.method  ? 'border-red-100 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) + "  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="default">Select Method</option>
                                <option value="transfer">Transfer</option>
                                <option value="cash">Cash</option>
                                <option value="va">Virtual Account</option>

                            </Select>
                        
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Referal
                            </Label>
                            <Input value={referal} onChange={ (e) => setReferal(e.target.value)} className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Referal Code"/>
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                    </div>
                </div>
                <div className='px-4 py-3 mt-4 '>
                    <div className="flex justify-end">
                            <Button type="submit" className='px-6 py-2.5  bg-indigo-400 hover:bg-indigo-800 rounded-lg text-white font-medium hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase'>
                                Submit
                            </Button>
                    </div>
                </div>
            </form>
           
           
        </MainLayout>
  )
}

export default Add