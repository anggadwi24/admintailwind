import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from "next/link";

const Navbar = ({user}) =>{
  
   
    return (
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" navbar-main="false" navbar-scroll="true">
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="leading-normal text-sm">
                <a className="opacity-50 text-slate-700" href="/">Pages</a>
              </li>
              <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Dashboard</li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
          </nav>

          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <div className="flex items-center md:ml-auto md:pr-4">
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                  <i className="fas fa-search"></i>
                </span>
                <input type="text" className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Type here..." />
              </div>
            </div>
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
      
              <li className="flex items-center">
                <a href="./pages/sign-in.html" className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                  <i className="fa fa-user sm:mr-1"></i>
                  <span className="hidden sm:inline">Sign In</span>
                </a>
              </li>
              <li className="flex items-center pl-4 xl:hidden">
                <a href="#!" type="button" className="block p-0 transition-all ease-nav-brand text-sm text-slate-500" sidenav-trigger="false">
                  <div className="w-4.5 overflow-hidden">
                    <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                    <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                    <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  </div>
                </a>
              </li>
              <li className="flex items-center px-4">
                <a href="/" className="p-0 transition-all text-sm ease-nav-brand text-slate-500">
                  <i fixed-plugin-button-nav="true" className="cursor-pointer fa fa-cog"></i>
             
                </a>
              </li>


              <li className="relative flex items-center pr-2">
                <p className="hidden transform-dropdown-show"></p>
                <a href="/" className="block p-0 transition-all text-sm ease-nav-brand text-slate-500" dropdown-trigger="true" aria-expanded="true">
                  <i className="cursor-pointer fa fa-bell"></i>
                </a>

                <ul dropdown-menu="true" className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer">
               
                  <li className="relative mb-2">
                    <a className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" href="/">
                      <div className="flex py-1">
                        <div className="my-auto">
                          <img src="/assets/img/team-2.jpg" className="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-1 font-normal leading-normal text-sm"><span className="font-semibold">New message</span> from Laur</h6>
                          <p className="mb-0 leading-tight text-xs text-slate-400">
                            <i className="mr-1 fa fa-clock"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="relative mb-2">
                    <a className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700" href="/">
                      <div className="flex py-1">
                        <div className="my-auto">
                          <img src="/assets/img/small-logos/logo-spotify.svg" className="inline-flex items-center justify-center mr-4 text-white text-sm bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-1 font-normal leading-normal text-sm"><span className="font-semibold">New album</span> by Travis Scott</h6>
                          <p className="mb-0 leading-tight text-xs text-slate-400">
                            <i className="mr-1 fa fa-clock"></i>
                            1 day
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="relative">
                    <a className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700" href="/">
                      <div className="flex py-1">
                        <div className="inline-flex items-center justify-center my-auto mr-4 text-white transition-all duration-200 ease-nav-brand text-sm bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl">
                    
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-1 font-normal leading-normal text-sm">Payment successfully completed</h6>
                          <p className="mb-0 leading-tight text-xs text-slate-400">
                            <i className="mr-1 fa fa-clock"></i>
                            2 days
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;