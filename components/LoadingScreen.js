import Head from 'next/head';
import { useAuth } from '../contexts/auth';
import Login from '../pages/login';

export default function LoadingScreen(){

    const { user, loading } = useAuth();

    if(user && !loading){
        return (
            <>
                <Head>
                    <title>Kasir Jua</title>
                </Head>
                <div className="relative">
                    <div className="absolute inset-0 h-screen flex">
                        <div className="m-auto">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    
                        </div>
                    </div>
                </div>
            </>
           
        )
    }else{
        return <Login/>
    }
   
}