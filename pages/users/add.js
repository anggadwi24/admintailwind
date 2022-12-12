
import { useAuth } from '../../contexts/auth';
import MainLayout from '../../layouts/MainLayout';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { useRouter } from "next/router";
import { useState } from 'react';
import Button from '../../components/Button';
import Cookies from 'js-cookie';
import api from '../../lib/Api';
import Success from '../../components/Success';
const Add = ()=>{
    const {user,level} = useAuth();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [levels,setLevel] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);
    const [success,setSuccess] = useState(null);

    
    const submitHandler = (e)=>{
      setLoading(true);
      e.preventDefault();

      const token = Cookies.get('token')
      api.defaults.headers.Authorization = `Bearer ${token}`
      api
      .post("/api/users/add",{name,email,password,level})
      .then((res) =>{
          setLoading(false);
          if(res.data.statusCode == 200){
            setError([]);
            setName('');
            setEmail('');
            setPassword('');
            setLevel('');

            setSuccess(res.data.message);

            
          }else{
            setError(res.data.message)
          }
         
      })
    }
   
    if(level == 'admin'){
      return (
          <MainLayout user={user} title="Users - JUAPOS" page="Users" subpage="Add users">
                
                <div className='flex justify-between mb-8'>
      
                    <h4 className="mt-3 text-lg font-semibold text-gray-600 dark:text-gray-300">
                      Add Users
                    </h4>
                  
                </div>
                
                <div className="px-4 py-3 mb-8  bg-white rounded-lg shadow-md dark:bg-gray-800">
             
                  {success && <Success message={success}></Success>}
                <form onSubmit={submitHandler}>


              
                <label className="block text-sm mb-4 mt-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Name
                  </span>
                  <Input 
                    type="text" 
                    className={ error && error.name ? 'border-red-600 block w-full mt-1 text-sm  dark:text-gray-300 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red input input-sm' : 'border-indigo-100 block w-full mt-1 text-sm border-red-600 dark:text-gray-300 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-red input input-sm' }
                    id="name" 
                    placeholder="Insert name"

                    value={name} onChange={(e) => setName(e.target.value)}
                  >
                  
                  </Input>
                  {error && error.name  &&
                    error.name.map((index) => {
                      return (
                        <span className="text-xs text-red-600 dark:text-red-400" key={index}>
                         {error.name}
                        </span>
                      )
                    })
                  
                  }
                 
                </label>

                <label className="block text-sm mb-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <Input 
                    type="email" 
                    className={error && error.email ? `border-red-600 block w-full mt-1 text-sm border-red-600 dark:text-gray-300 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red input input-sm` : `border-indigo-100 block w-full mt-1 text-sm border-red-600 dark:text-gray-300 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-red input input-sm` } 
                    id="email"
                    placeholder="Insert email"
                    error={error.email}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  >
                  
                  </Input>

                  {error && error.email && 
                    error.email.map((index) => {
                      return (
                        <span className="text-xs text-red-600 dark:text-red-400" key={index}>
                         {error.email}
                        </span>
                      )
                    })
                  
                  }
                </label>

                <label className="block text-sm mb-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <Input 
                    type="password" 
                    className={error && error.password ? `border-red-600 block w-full mt-1 text-sm border-red-600 dark:text-gray-300 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red input input-sm` : `border-indigo-100 block w-full mt-1 text-sm border-red-600 dark:text-gray-300 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-red input input-sm` } 
                    id="password"
                    placeholder="Insert password"
                    value={password} onChange={(e) => setPassword(e.target.value)}  
                  >
                  
                  </Input>

                  {error && error.password &&
                    error.password.map((index) => {
                      return (
                        <span className="text-xs text-red-600 dark:text-red-400" key={index}>
                         {error.password}
                        </span>
                      )
                    })
                  
                  }
                </label>

                <label className="block text-sm mb-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Level
                  </span>
                  <Select 

                    className={error && error.level ? 'block w-full mt-1 text-sm text-black border-red-600 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-red-600 focus:outline-none focus:shadow-outline-danger dark:focus:shadow-outline-gray input input-sm' : 'block w-full mt-1 text-sm text-black border-indigo-100 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray input input-sm'}
                    id="level"
                    onChange={(e) => setLevel(e.target.value)}
                  >
                      <option value='admin' {...levels == 'admin' && checked}>Admin</option>
                      <option value='user' {...levels == 'user' && checked}>User</option>

                  </Select>

                  {error && error.level &&
                    error.level.map((index) => {
                      return (
                        <span className="text-xs text-red-600 dark:text-red-400" key={index}>
                         {error.level}
                        </span>
                      )
                    })
                  
                  }
                </label>
                {!loading &&  <Button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Submit</Button> }
                {loading && <Button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple loading">Loading</Button>}
               
                </form>
              
              
              </div>
          </MainLayout>
      )
    }else{
      useEffect(() => {
           
        router.push({
            pathname: '/',
            query: { name: 'Someone' }
        }, '/');
        
      }, [list.message]);
    }
    
}

export default Add;