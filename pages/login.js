
 import Head from 'next/head';
 import Router from 'next/router';

import { useState } from 'react';
import Home from '.';
import Button from '../components/Button';
import Input from '../components/Input';

import LoadingScreen from '../components/LoadingScreen';
import Image from 'next/image';
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
                    
                <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                             
                                <Image  aria-hidden="true"
                                className=" object-cover w-full h-full dark:hidden"
                                src="/assets/img/login-office.jpeg"
                                alt="Background Login" height={700} width={700} />
                                <Image  aria-hidden="true"
                                className="hidden object-cover w-full h-full dark:block"
                                src="/assets/img/login-office-dark.jpeg"
                                alt="Background Login" height={700} width={700} />

                                
                             
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                
                                <div className="w-full">
                                    <form onSubmit={submitHandler}>
                                    {error && error.length == 1 && <Error errors={error}></Error>}
                                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200" >
                                        Login
                                    </h1>
                                    <label className="block text-sm">
                                        <span className="text-gray-700 dark:text-gray-400">Email</span>
                                        <Input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-inpu" type="email" id="asdas1230918s" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                                        {error && error.email &&
                                        error.email.map((index) => {
                                            return (
                                                <span className='text-error' key={index}>
                                            
                                                {error.email}
                                                </span>
                                            )
                                        })
                                        

                                        }
                                    </label>
                                    <label className="block mt-4 text-sm">
                                        <span className="text-gray-700 dark:text-gray-400">Password</span>
                                        <Input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"  type="password" id="jasnczxk71239sad" placeholder="Masukan passoword" value={password} onChange={(e) => setPassword(e.target.value)}></Input>

                                        {error && error.password &&
                                            error.password.map((index) => {
                                            return (
                                                <span className='text-error' key={index}>
                                            
                                                    {error.password}
                                                </span>
                                            )
                                            })
                                        

                                        }
                                    </label>
                                    {!loading &&  <Button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Login</Button> }
                                    {loading && <Button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple loading">Loading</Button>}
                                    
                                    

                                    <hr className="my-8" />
                                    </form>
                                </div>
                                
                            </div>
                        </div>
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