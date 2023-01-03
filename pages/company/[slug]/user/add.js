import { useRouter } from "next/router"
import api from "../../../../lib/Api"
import apiv1 from "../../../../lib/ApiV1"
import { useAuth } from "../../../../contexts/auth"
import { useState } from "react"
import Cookies from "js-cookie"
import MainLayout from "../../../../layouts/MainLayout"
import Moment from "moment"
import 'moment/locale/id';
import Image from "next/image"
import { Input, Grid, Button,Loading,Text} from "@nextui-org/react";

const Add = (props) => {
    const router = useRouter()
    const {slug} = router.query
    const data = props.data.data
    const breadcrumb = [{'name':'Company','url':'/company'},{'name':'User','url':`/company/${slug}`},{'name':'Add','url':`/company/${slug}/user/add`}];
    const {user} = useAuth();
    const [validation,setValidations] = useState([])
    const [error,setErrors] = useState(null)
    const [loading,setLoading] = useState(false)
    const [name,setName] = useState('')
    const [nickname,setNickname] = useState('')
    const [email,setEmail] = useState('')
    const [level,setLevel] = useState('cashier')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')

    const submitHandle = (e) => {
        e.preventDefault();
        setLoading(true)
        const token = Cookies.get('token');
        apiv1.defaults.headers.Authorization = `Bearer ${token}`
        apiv1
        .post(`/api/company/${slug}/user/add`,{name,email,phone,nickname,password,level})
        .then((res) =>{
           setLoading(false)
            if(res.data.statusCode === 200){
                router.push(
                    { pathname: `/company/${slug}`, query: { message: "User successfuly created",type:'success' } },`/company/${slug}?type=success`
                   
                  );
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

  return (
    <MainLayout breadcrumb={breadcrumb} user={user} title={`Add User ${data.name} - JUAPOS`} page="Company">
        <div className="flex justify-between">
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">User Add</h4>
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
                            <h6 className="text-sm font-normal">{Moment(data.payment[0].date).format('YYYY-MM-DD HH:mm')} - {Moment(data.expiry_on).format('YYYY-MM-DD HH:mm')}</h6>
                           
                          


                        </div>
                    </div>
                   


                </div>
               
            </div>
        </div>
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 pt-4 pb-8">
           <h6 className="text-md font-medium my-2 mx-3">Form Users</h6>
            <form onSubmit={submitHandle}>
            <Grid.Container gap={2} justify="between">
                <Grid  xs={12} md={4}>
                    <Input
                        clearable={loading ? false : true}
                        helperText={ (validation && validation.name) ? validation.name.map((value,index) => {
                            return value+' '
                        }) : "" }
                        helperColor="error"
                        label="Name"
                        value={name}
                        status={(validation && validation.name) ? 'error' : 'default'}
                        onChange={ (e) => setName(e.target.value)}
                        placeholder="Enter name"
                        fullWidth={true}
                        disabled={loading ? true : false}
                        />
                        
                </Grid>
                <Grid  xs={12} md={4}>
                    <Input
                        clearable={loading ? false : true}
                        helperText={ (validation && validation.nickname) ? validation.nickname.map((value,index) => {
                            return value+' '
                        }) : "" }
                        helperColor="error"
                        label="Nickname "
                        value={nickname}
                        status={(validation && validation.nickname) ? 'error' : 'default'}
                        onChange={ (e) => setNickname(e.target.value)}
                        placeholder="Enter nickname"
                        fullWidth={true}
                        disabled={loading ? true : false}
                        />
                </Grid>
                <Grid  xs={12} md={4}>
                    <Input
                        clearable={loading ? false : true}
                        helperText={ (validation && validation.level) ? validation.level.map((value,index) => {
                            return value+' '
                        }) : "" }
                        helperColor="error"
                        label="Level "
                        value={level}
                        status={(validation && validation.level) ? 'error' : 'default'}
                        onChange={ (e) => setLevel(e.target.value)}
                        placeholder="Enter level owner/cashier"
                        fullWidth={true}
                        disabled={loading ? true : false}
                        
                        />
                </Grid>
                <Grid xs={12} md={6}>
                    <Input
                        clearable={loading ? false : true}
                        helperText={ (validation && validation.email) ? validation.email.map((value,index) => {
                            return value+' '
                        }) : "" }
                        
                        helperColor="error"
                        label="Email "
                        value={email}
                        status={(validation && validation.email) ? 'error' : 'default'}
                        type="email"
                        onChange={ (e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        fullWidth={true}
                        disabled={loading ? true : false}
                        />
                </Grid>
                <Grid  xs={12} md={6}>
                    <Input
                        clearable={loading ? false : true}
                        helperText={ (validation && validation.phone) ? validation.phone.map((value,index) => {
                            return value+' '
                        }) : "" }
                        helperColor="error"
                        label="Phone "
                        value={phone}
                        status={(validation && validation.phone) ? 'error' : 'default'}
                        type="number"
                        onChange={ (e) => setPhone(e.target.value)}
                        placeholder="Enter Phone"
                        fullWidth={true}
                        disabled={loading ? true : false}
                        />
                </Grid>
                <Grid xs={12} md={8}>
                    <Input.Password
                        clearable={loading ? false : true}
                        helperText={ (validation && validation.password) ? validation.password.map((value,index) => {
                            return value+' '
                        }) : "" }
                        label="Password "
                        helperColor="error"
                        value={password}
                        status={(validation && validation.password) ? 'error' : 'default'}
                        type="password"
                        onChange={ (e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        fullWidth={true}
                        disabled={loading ? true : false}
                        />
                </Grid>
                
                
            </Grid.Container>
            <div className="flex justify-end mx-3">
                    <Button type="submit" color="secondary" auto disabled={loading ? true : false}>
                    
                    {loading &&  <Loading type="points-opacity" color="currentColor" css={{mr:'3px'}} size="sm" />  }
                    {!loading && 'Submit'}
                    </Button>
            </div>
     
                
                   
               
              

           
            </form>
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
export default Add