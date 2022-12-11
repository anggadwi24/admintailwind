
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/auth';

const Home = () => {

 const { user, loading,level } = useAuth();
 
  return (
    <>
    
      <MainLayout user={user} title="Dashboard - JUAPOS">
      <div className="bg-gray-800 pt-3">
          <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
              <h1 className="font-bold pl-2">Analytics</h1>
          </div>
      </div>
      <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              
              <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                      <div className="flex-shrink pr-4">
                          <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                      </div>
                      <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold uppercase text-gray-600">Total Revenue</h2>
                          <p className="font-bold text-3xl">$3249 <span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
                      </div>
                  </div>
              </div>
            
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                      <div className="flex-shrink pr-4">
                          <div className="rounded-full p-5 bg-pink-600"><i className="fas fa-users fa-2x fa-inverse"></i></div>
                      </div>
                      <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold uppercase text-gray-600">Total Users</h2>
                          <p className="font-bold text-3xl">249 <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></p>
                      </div>
                  </div>
              </div>
            
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                      <div className="flex-shrink pr-4">
                          <div className="rounded-full p-5 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-inverse"></i></div>
                      </div>
                      <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold uppercase text-gray-600">New Users</h2>
                          <p className="font-bold text-3xl">2 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
                      </div>
                  </div>
              </div>
            
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              
              <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                      <div className="flex-shrink pr-4">
                          <div className="rounded-full p-5 bg-blue-600"><i className="fas fa-server fa-2x fa-inverse"></i></div>
                      </div>
                      <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold uppercase text-gray-600">Server Uptime</h2>
                          <p className="font-bold text-3xl">152 days</p>
                      </div>
                  </div>
              </div>
            
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              
              <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                      <div className="flex-shrink pr-4">
                          <div className="rounded-full p-5 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-inverse"></i></div>
                      </div>
                      <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold uppercase text-gray-600">To Do List</h2>
                          <p className="font-bold text-3xl">7 tasks</p>
                      </div>
                  </div>
              </div>
            
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            
              <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                      <div className="flex-shrink pr-4">
                          <div className="rounded-full p-5 bg-red-600"><i className="fas fa-inbox fa-2x fa-inverse"></i></div>
                      </div>
                      <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold uppercase text-gray-600">Issues</h2>
                          <p className="font-bold text-3xl">3 <span className="text-red-500"><i className="fas fa-caret-up"></i></span></p>
                      </div>
                  </div>
              </div>
            
          </div>
      </div>
      </MainLayout>
    </>
  
  )
}

export default Home;

