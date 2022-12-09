
 import Head from 'next/head';
 import Router from 'next/router';

import { useState } from 'react';
import Home from '.';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';
import LoadingScreen from '../components/LoadingScreen';

import { useAuth } from '../contexts/auth';



const Login = () => {

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [error,setErrors] = useState([]);
    const {login} = useAuth('/dashboard');

    const { user, loading } = useAuth();
    const submitHandler = (e) =>{
        e.preventDefault();
        

       
        login(email,password);
        
    }
    if(!user){
       
        return (
            <>
                <Head>
                    <title>
                    Login - Internal
                    </title>
                </Head>
                {loading &&   <div className="relative">
                    <div className="absolute inset-0 h-screen flex">
                        <div className="m-auto">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    
                        </div>
                    </div>
                </div>}
                {!loading && 
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                        <form onSubmit={submitHandler}>
                            <div className="mt-4">
                                <div className='form-group'>
                                    <Label htmlFor="email">Email</Label>
                                    <Input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="email" id="email" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                                </div>
                                <div className='form-group'>
                                    <Label htmlFor="password">Password</Label>
                                    <Input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="password" id="password" placeholder="Masukan passoword" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
    
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <Button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</Button>
                                   
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                }
                
            </>
        )
    }else{
        Router.push({
            pathname: '/',
          
        })
        return <Home></Home>
    }
   

   
        
        
    
}

export default Login;