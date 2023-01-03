import { useRouter } from "next/router"
import api from "../../../../../lib/Api"
import { useAuth } from "../../../../../contexts/auth"
import { useState } from "react"
import Cookies from "js-cookie"
import MainLayout from "../../../../../layouts/MainLayout"
import { Input, Grid, Button,Loading,Text} from "@nextui-org/react";

const Edit = (props) => {
    console.log(props)
    const router = useRouter()
    const {slug} = router.query
    const {email} = router.query
    const data = props.data.user
    const {user}= useAuth()
    const breadcrumb = [{'name':'Company','url':'/company'},{'name':'User','url':`/company/${slug}`},{'name':'Edit','url':`/company/${slug}/user/${email}/edit/`}];
    
    const [validation,setValidations] = useState([])
    const [error,setErrors] = useState(null)
    const [loading,setLoading] = useState(false)
    const [name,setName] = useState(data.name)
    const [nickname,setNickname] = useState(data.nickname)
    const [emails,setEmail] = useState(data.email)
    const [level,setLevel] = useState(data.level)
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState(data.phone)

    const submitHandle = (e) =>{
        e.preventDefault();
        setLoading(true)
        const token = Cookies.get('token');
        api.defaults.headers.Authorization = `Bearer ${token}`
        api
        .post(`/api/company/${slug}/user/edit/${email}`,{name,email,phone,nickname,password,level})
        .then((res) =>{
           setLoading(false)
            if(res.data.statusCode === 200){
                router.push(
                    { pathname: `/company/${slug}`, query: { message: "User successfuly updated",type:'success' } },`/company/${slug}?type=success`
                   
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
    <MainLayout user={user} breadcrumb={breadcrumb} page="Company" title={`Edit ${data.name} - JUAPOS` }>
         <div className="flex justify-between">
            <h4 className="mb-4 text-lg font-semibold text-gray-400 dark:text-gray-300">User Edit</h4>
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
    const email = context.query.email;

 
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data: resp } = await api.get(`/api/company/${slug}/user/edit/${email}`)
     
     
    if (resp.statusCode === 200){
        
            return {
                props:{
                    data:resp
                },
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
export default Edit