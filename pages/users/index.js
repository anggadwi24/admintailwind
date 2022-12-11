
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import { useAuth } from '../../contexts/auth';
import MainLayout from '../../layouts/MainLayout';






const Users = () =>{

    const {user} = useAuth();
    return (
        <>
            <Head>
                <title>Users - JUAPOS</title>
            </Head>
            <MainLayout user={user}>
                <div className='container mx-auto'>
                    <div className="bg-gray-800 pt-3 w-4/6">
                        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                            <h1 className="font-bold pl-2">Users</h1>
                        </div>
                    </div>
                    <div className="flex flex-row ">
                        <div className="basis-full">
                            
                            
                            
                        </div>
                    
                    </div>
                </div>
            </MainLayout>
        </>
       
       
    )
}

export default Users;