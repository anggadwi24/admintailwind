
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/auth';

const Home = () => {

 const { user, loading,level } = useAuth();
 
  return (
    <>
    
      <MainLayout user={user} title="Dashboard - JUAPOS" page="Dashboard" subpage="">
        <div className="grid grid-cols-4 gap-6 xl:grid-cols-1">


     
          <div className="report-card">
              <div className="card">
                  <div className="card-body flex flex-col">
                      
                   
                      <div className="flex flex-row justify-between items-center">
                          <div className="h6 text-indigo-700 fad fa-shopping-cart"></div>
                          <span className="rounded-full text-white badge bg-teal-400 text-xs">
                              12%
                              <i className="fal fa-chevron-up ml-1"></i>
                          </span>
                      </div>
                    
                      <div className="mt-8">
                          <h1 className="h5 num-4"></h1>
                          <p>items sales</p>
                      </div>                
                     
                  </div>
              </div>
              <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
          </div>
       
          <div className="report-card">
              <div className="card">
                  <div className="card-body flex flex-col">
                      
                    
                      <div className="flex flex-row justify-between items-center">
                          <div className="h6 text-red-700 fad fa-store"></div>
                          <span className="rounded-full text-white badge bg-red-400 text-xs">
                              6%
                              <i className="fal fa-chevron-down ml-1"></i>
                          </span>
                      </div>
                    
                      <div className="mt-8">
                          <h1 className="h5 num-4"></h1>
                          <p>new orders</p>
                      </div>                
                    
                  </div>
              </div>
              <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
          </div>
        
          <div className="report-card">
              <div className="card">
                  <div className="card-body flex flex-col">
                      
                    
                      <div className="flex flex-row justify-between items-center">
                          <div className="h6 text-yellow-600 fad fa-sitemap"></div>
                          <span className="rounded-full text-white badge bg-teal-400 text-xs">
                              72%
                              <i className="fal fa-chevron-up ml-1"></i>
                          </span>
                      </div>
                     
                      <div className="mt-8">
                          <h1 className="h5 num-4"></h1>
                          <p>total Products</p>
                      </div>                
                   

                  </div>
              </div>
              <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
          </div>
         
          <div className="report-card">
              <div className="card">
                  <div className="card-body flex flex-col">
                      
                  
                      <div className="flex flex-row justify-between items-center">
                          <div className="h6 text-green-700 fad fa-users"></div>
                          <span className="rounded-full text-white badge bg-teal-400 text-xs">
                              150%
                              <i className="fal fa-chevron-up ml-1"></i>
                          </span>
                      </div>
                    

                  
                      <div className="mt-8">
                          <h1 className="h5 num-4"></h1>
                          <p>new Visitor</p>
                      </div>                
                    

                  </div>
              </div>
              <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
          </div>



      </div>
      </MainLayout>
    </>
  
  )
}

export default Home;

