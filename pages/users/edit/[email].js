
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import api from '../../../lib/Api';
import { useAuth } from '../../../contexts/auth';


const Edit = (users) =>{
    const router = useRouter()
    const { email } = router.query
    console.log(users)
    const {user,level} = useAuth();
}
export async function getServerSideProps(context) {

    
    const token = context.req.cookies.token;
    const email = context.params.email;
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data: user } = await api.get('api/users/edit/'[email])
   
   
    if (user){
        return {
            props:{
                user:user,
                loading:false,
            },
        }
    } 
  
  
}
export default Edit;