import { useRouter } from "next/router"
import api from "../../../../lib/Api";
import { useAuth } from "../../../../contexts/auth";
import MainLayout from "../../../../layouts/MainLayout";
import { useState } from "react";
import Label from "../../../../components/Label";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import Cookies from "js-cookie";

const Edit = (props) => {
  console.log(props)

  const router = useRouter();
  const {slug,price} = router.query;
  const {user,level} = useAuth();
  const breadcrumb = [{'name':'Feature','url':'/feature'},{'name':'Detail','url':`/feature/detail/${slug}`},{'name':'Edit Price',url:`/feature/price/${slug}/${price}`}];
  const [name,setName] = useState(props.data.price.name)
  const [duration,setDuration] = useState(props.data.price.duration)
  const [discount,setDiscount] = useState(props.data.price.discount)
  const [prices,setPrice] = useState(props.data.price.price)
  const [errors,setError] = useState([]);
  const [loading,setLoading] = useState(false);


  if(props.data.statusCode !== 200){
    router.push(
      { pathname: "/feature", query: { message: props.data.message,type:'error' } },"/feature"
     
    );
  }

  if(level !== 'admin'){
    router.push(
      {pathname:"/feature",query:{message:'You cant access this page',type:'error'}},"/feature"
    )
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true)

    const token = Cookies.get('token')
    api.defaults.headers.Authorization = `Bearer ${token}`
    api
    .post(`/api/feature/edit/price/${slug}/${price}`,{name,discount,price:prices,duration})
    .then((res) =>{
        
        setLoading(false)
       
        if(res.data.statusCode == 200){
            router.push(
                { pathname: `/feature/detail/${slug}`, query: { message: "Feature price successfuly updated",type:'success' } },`/feature/detail/${slug}`
               
              );
        }else{
            setError(res.data.message);
           
        }
    })

  }
  return (
    <MainLayout user={user} breadcrumb={breadcrumb} title="Edit Price" page="Feature">
        <div className='flex justify-between mb-0'>
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">
               Edit Price 
            </h4>
        </div>
        <div className="px-4 py-3   bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={submitHandler}>
              <div className="flex flex-no-wrap">
                    <Label className="w-2/5 block text-sm mb-4 mt-4">
                        <span className="text-gray-700 dark:text-gray-400">
                            Name
                        </span>
                        <Input 
                            type="text" 
                            className={ (errors.name ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') +  "  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                        
                            value={name}
                            placeholder="Insert price name"
                            onChange = { (e) => setName(e.target.value)}
                            disabled={loading == false ? '':true}
                            
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
                    <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                        <span className="text-gray-700 dark:text-gray-400">
                            Duration
                        </span>
                        <Select 
                            className={ (errors.duration ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') +  "  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                            value={duration}
                            disabled={loading == false ? '':true}
                            onChange={ (e) => setDuration(e.target.value)}
                            
                        >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        </Select>
                    </Label>
                    {errors && errors.duration &&
                      errors.duration.map((value,index) => {
                            return (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                            )
                        })
                    }
                </div>
                <div className="flex flex-no-wrap">
                    <Label className="w-2/5 block text-sm mb-4 mt-4">
                        <span className="text-gray-700 dark:text-gray-400">
                            Price
                        </span>
                        <Input 
                            type="number" 
                            className={ (errors.price ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') + " block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                            value={prices}
                            placeholder="Insert price"
                            onChange={ (e) => setPrice(e.target.value)}
                            disabled={loading == false ? '':true}
                          
                        >
                        </Input>
                        {errors && errors.price &&
                          errors.price.map((value,index) => {
                                return (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                                )
                            })
                        }
                    </Label>
                    <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                        <span className="text-gray-700 dark:text-gray-400">
                            Discount
                        </span>
                        <Input 
                            type="number" 
                            className={ (errors.discount ? ' border-red-300 focus:border-red-400' : ' border-indigo-100 focus:border-indigo-400') + " block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}
                            value={discount}
                            placeholder="Insert discount"
                            onChange={ (e) => setDiscount(e.target.value)}
                            disabled={loading == false ? '':true}
                            
                        >
                        </Input>
                        {errors && errors.discount &&
                          errors.discount.map((value,index) => {
                            return (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}><span className="font-medium">Oops!</span> {value} </p>
                            )
                        })
                    }
                    </Label>
                </div>
                {!loading &&   <Button  className="float-right inline-block px-6 py-2.5 bg-indigo-400 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-indigo-800 hover:shadow-lg focus:bg-indigo-800  focus:outline-none focus:ring-0 transition duration-150 uppercase ">Submit</Button>}
                {loading &&   <Button disabled={true} className="float-right px-6  disabled:text-white text-xs  font-medium disabled:bg-indigo-500  rounded-full btn btn-sm  loading">Loading</Button>}
              </form>
          </div>
    </MainLayout>
  )
}


export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const slug = context.query.slug;
  const price = context.query.price;
  api.defaults.headers.Authorization = `Bearer ${token}`
  const { data: resp } = await api.get(`/api/feature/edit/price/${slug}/${price}`)
   
   
  if (resp){
      return {
          props:{
              data:resp
          },
      }
  } 
  
}
export default Edit