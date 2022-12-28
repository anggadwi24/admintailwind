
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
    const [province,setProvince] = useState('');
    const [city,setCity] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [postcode, setPostcode] = useState('')
    const [category,setCategory] = useState('')
    const [feature,setFeature] = useState('')
    const [price,setPrice] = useState('')
    const [method,setMethod] = useState('')
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
        setLoading(true)
        const token = Cookies.get('token');
        apiv1.defaults.headers.Authorization = `Bearer ${token}`
        apiv1
        .post(`/api/company/add`,{name,email,phone,category,address,kode_pos:postcode,province,city,feature,duration:price,method,icon,referal})
        .then((res) =>{
           setLoading(false)
            if(res.data.statusCode === 200){

            }else if(res.data.statusCode === 422){
                setValidations(res.data.message)
               
                
            }else{
                setErrors(res.data.message)
            }
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
            } else if (err.request) {
                console.log(err.request)
              // client never received a response, or request never left
            } else {
              // anything else
              console.log(err)
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
        setPrice('')
      
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
                            <Input value={name} disabled={ loading ? true : false} onChange={ (e) => setName(e.target.value)} className={  (validation && validation.name  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"   block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Company Name"/>
                            {validation && validation.name &&
                                validation.name.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                          
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Category
                            </Label>
                            {categories && categories.record.length > 0 && 
                                <Autocomplete options={categories.record} 
                                value={category}
                                onChange={setCategory}
                                className={  (validation && validation.category  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"   block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"}
                                disabled={ loading ? true : false}
                            />
                            }
                            {validation && validation.category &&
                                validation.category.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Email
                            </Label>
                            <Input value={email} disabled={ loading ? true : false} onChange={ (e) => setEmail(e.target.value)} className={(validation && validation.email  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="company@gmail.com"/>
                            {validation && validation.email &&
                                validation.email.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Phone
                            </Label>
                            <Input value={phone} disabled={ loading ? true : false} onChange={ (e) => setPhone(e.target.value)} className={ (validation && validation.phone  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="6288888888"/>
                            {validation && validation.phone &&
                                validation.phone.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                       
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Provinsi
                            </Label>
                            <Select  disabled={ loading ? true : false} id="province" onChange={  handleProvince}  value={province} className={( (validation && validation.province) ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="">{!provinces ? 'Loading..':'Select provinces'}</option>
                                {provinces && provinces.data.length > 0 && 
                                    provinces.data.map( (value,index) => {
                                        return (
                                            <option value={value.id} index={index} key={value.id}>{value.name}</option>
                                        )
                                    })
                                }
                            </Select>
                            {validation && validation.province &&
                                validation.province.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                City
                            </Label>
                            <Select disabled={ loading ? true : false} onChange={  (e) => setCity(e.target.value)}  value={city} className={((validation && validation.city)  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="">Select city</option>
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
                            {validation && validation.city &&
                                validation.city.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Address
                            </Label>
                            <Textarea disabled={ loading ? true : false} value={address} onChange={ (e) => setAddress(e.target.value)} className={ (validation && validation.address  ? 'border-red-300 focus:ring-red-400 ':' border-indigo-100 focus:ring-indigo-400' ) +"   focus:border-indigo-400 block p-2.5 text-sm mt-1 w-full  border  rounded-lg   focus:outline-none"} id="grid-first-name" placeholder='Company address'>
                                
                            </Textarea>
                            {validation && validation.address &&
                                validation.address.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Post Code
                            </Label>
                            <Input disabled={ loading ? true : false} value={postcode} onChange={ (e) => setPostcode(e.target.value)} className={ (validation && validation.kode_pos  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"   block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="number" placeholder="XXXXX"/>
                            {validation && validation.kode_pos &&
                                validation.kode_pos.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="block w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <span className="sr-only">Choose Icon</span>
                            <input type="file" onChange={uploadToClient} accept="image/jpg,image/png,image/jpeg" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </label>
                        {validation && validation.icon &&
                                validation.icon.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                    </div> 
                </div>
                <div className='px-4 py-3 mt-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
                    <h4 className="mb-8 text-lg font-semibold text-dark uppercase dark:text-gray-300">Data Feature</h4>
                    <div className="flex flex-wrap -mx-3 mb-6">
                       
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Feature
                            </Label>
                            <Select disabled={ loading ? true : false} id="feature" onChange={  handleFeature}  value={feature} className={ (validation && validation.feature  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"   block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="">{!features ? 'Loading..':'Select Feature'}</option>
                                {features && features.data.length > 0 && 
                                    features.data.map( (value,index) => {
                                        return (
                                            <option value={value.slug} index={index} key={value.slug}>{value.name}</option>
                                        )
                                    })
                                }
                            </Select>
                            {validation && validation.feature &&
                                validation.feature.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Duration
                            </Label>
                            <Select  disabled={ loading ? true : false} onChange={  (e) => setPrice(e.target.value)}  value={price} className={ (validation && validation.duration  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) +"  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="">Select price</option>
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
                            {validation && validation.duration &&
                                validation.duration.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        
                      
                        </div>
                       
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Method
                            </Label>
                            <Select disabled={ loading ? true : false}  onChange={ (e)=> setMethod(e.target.value)}  value={method} className={ (validation && validation.method  ? 'border-red-300 focus:border-red-400 ':' border-indigo-100 focus:border-indigo-400' ) + "  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} >
                                <option disabled={true} value="">Select Method</option>
                                <option value="transfer">Transfer</option>
                                <option value="cash">Cash</option>
                                <option value="va">Virtual Account</option>

                            </Select>
                            {validation && validation.method &&
                                validation.method.map((value,index) => {
                                    return (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Referal
                            </Label>
                            <Input disabled={ loading ? true : false} value={referal} onChange={ (e) => setReferal(e.target.value)} className={"  border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md"} id="grid-first-name" type="text" placeholder="Referal Code"/>
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                    </div>
                </div>
                <div className='px-4 py-3 mt-4 '>
                    <div className="flex justify-end">
                            {!loading && <Button type="submit" className='px-6 py-2.5  bg-indigo-400 hover:bg-indigo-800 rounded-lg text-white font-medium hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase'>
                                Submit
                            </Button> }
                            {loading &&   
                                <Button disabled={true} className="inline-flex  px-6 py-2.5  bg-indigo-400 hover:bg-indigo-800 rounded-lg text-white font-medium hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase">
                                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg> Loading....
                            </Button>}

                    </div>
                </div>
            </form>
            {errors && 
            <div id="toast-success" className="flex absolute top-20 right-5 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                
                <div className={" text-red-500 bg-red-200 inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg dark:bg-green-800 dark:text-green-200"}>
            
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{errors}</div>
              
    
    
            </div>
        }
        </MainLayout>
  )
}

export default Add