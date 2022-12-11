
 import Head from 'next/head';
 import Router from 'next/router';

import { useState } from 'react';
import Home from '.';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';
import LoadingScreen from '../components/LoadingScreen';
import Error from '../components/Error';
import { useAuth } from '../contexts/auth';



const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setErrors] = useState([]);
    const {login} = useAuth();

    const { user, loading } = useAuth();
   
    const submitHandler = async ( e) =>{
        e.preventDefault();
        

      login({email,password,setErrors})
   

       
       
        
    }
    
    if(!user){
       
        return (
            <>
                <Head>
                    <title>
                            LOGIN - JUAPOS
                    </title>
                </Head>
                    
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    {error && error.length == 1 && <Error errors={error}></Error>}
                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                      
                        <form onSubmit={submitHandler}>
                            <div className="mt-4">
                                <div className='form-control w-full max-w-xs mb-3'>
                                    <label className='label'>
                                        <span className="label-text">Email</span>
                                    </label>
                                   
                                    <Input className="input input-bordered w-full max-w-xs" type="email" id="asdas1230918s" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                                    {error && error.email &&
                                       error.email.map((index) => {
                                        return (
                                            <span className='text-error' key={index}>
                                        
                                               {error.email}
                                            </span>
                                        )
                                       })
                                    

                                    }
                                </div>
                                <div className='form-control w-full max-w-xs mb-3'>
                                    <label className='label'>
                                        <span className="label-text">Password</span>
                                    </label>
                                   
                                    <Input className="input input-bordered w-full max-w-xs"  type="password" id="jasnczxk71239sad" placeholder="Masukan passoword" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                                    {error && error.password &&
                                       error.password.map((index) => {
                                        return (
                                            <span className='text-error' key={index}>
                                        
                                               {error.password}
                                            </span>
                                        )
                                       })
                                    

                                    }
                                </div>
                                
                                
                                <div className="flex items-baseline justify-between">
                                   
                                    {!loading &&  <Button className="btn btn-primary btn-block">Login</Button> }
                                    {loading && <Button className="btn btn-primary loading btn-block">Loading</Button>}
                                   
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
               

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