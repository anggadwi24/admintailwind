import Link from 'next/link';
import Image from 'next/image';


export default function Sidebar({user}) {
   
  return (
    <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
        <div className="h-19.5">
        <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" sidenav-close="true"></i>
        <Link href="#!" className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"  >
            <img src="/assets/img/logo-ct.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Soft UI Dashboard</span>
        </Link>
      
        </div>

        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
            <a className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors" href="./pages/dashboard.html">
                <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
            </a>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/tables.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Tables</span>
            </a>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/billing.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Billing</span>
            </a>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/virtual-reality.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Virtual Reality</span>
            </a>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/rtl.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">RTL</span>
            </a>
            </li>

            <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 font-bold leading-tight uppercase text-xs opacity-60">Account pages</h6>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/profile.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Profile</span>
            </a>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/sign-in.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Sign In</span>
            </a>
            </li>

            <li className="mt-0.5 w-full">
            <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/sign-up.html">
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Sign Up</span>
            </a>
            </li>
        </ul>
        </div>

  
  </aside>

    
  )
}
