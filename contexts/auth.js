import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import  { useRouter } from 'next/router';
import LoadingScreen from '../components/LoadingScreen';
//api here is an axios instance which has the baseURL set according to the env.
import api from '../lib/Api';
import Login from '../pages/login';
import { NextResponse, NextRequest } from 'next/server'


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [level, setLevel] = useState(null)
    
    const [error,setError] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
           
            if (token) {
               
                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get('api/user')
              
                if (user) setUser(user);
                    setLevel(user.level);
                   
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async ({setErrors,email,password}) => {
        setLoading(true);

        setErrors([]);
        api
        .post("/api/login",{email,password})
        .then((res) =>{
            setLoading(false);
            if(res.data.statusCode == 200){
                if(res.data.token){
              
              
                    
                
                    Cookies.set('token', res.data.token, { expires: 2147483647 })
                    api.defaults.headers.Authorization = `Bearer  ${res.data.token}`
                    setUser(res.data.user)
                   
                    router.push("/")
                    
                
                }
            }else{
                setErrors(res.data.msg);
                
            }
           
        })
        
        
      
    }
   
    const logout = () => {
        api
        .get("/api/logout")
        .then((res) =>{
            Cookies.remove('token')
            setUser(null)
            delete api.defaults.headers.Authorization
           router.push('/login')
        })
        .catch(error => {
           
            if(error.response.status != 401) throw error

           
        })
        
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout,level,error,setError }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)
export const ProtectRoute = ({ children }) => {
    const routers = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading || (!isAuthenticated )){
        
       return <LoadingScreen/>
    }else{
        return children;

    }
  };