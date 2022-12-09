
 import Head from 'next/head';
 import Router from 'next/router';

import { useEffect, useState } from 'react';

import LoadingScreen from '../components/LoadingScreen';

import { useAuth } from '../contexts/auth';



const Logout = () => {
    const {user,logout} = useAuth();
    useEffect(() => {

        logout();
    })
}

export default Logout;