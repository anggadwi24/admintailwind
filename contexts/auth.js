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
    
    const [error,setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
           
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get('api/user')
              
                if (user) setUser(user);
                    setLevel(user.level);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {
        api
        .post("/api/login",{email,password})
        .then((res) =>{
            if(res.data.token){
              
              
                
                console.log(res.data);
                Cookies.set('token', res.data.token, { expires: 2147483647 })
                api.defaults.headers.Authorization = `Bearer  ${res.data.token}`
                setUser(res.data.user)
                setLevel(res.data.user.level)
                router.push("/")
            
            }
        })
        .catch(error => {
           
            if(error.response.status != 401) throw error

            setErrors(error.response.data.message);

        })
        
      
    }

    const logout = () => {
        api
        .get("/api/logout")
        .then((res) =>{
            Cookies.remove('token')
            setUser(null)
            delete api.defaults.headers.Authorization
            window.location.pathname = '/login'
        })
        .catch(error => {
           
            if(error.response.status != 401) throw error

            setErrors(error.response.data.message);

        })
        
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
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