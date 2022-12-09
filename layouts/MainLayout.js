import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import Script from "next/script";

const MainLayout = ({children,user}) =>{
  
    return (
        <>
        <Head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"/>
            <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet"></link>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js" integrity="sha256-xKeoJ50pzbUGkpQxDYHD7o7hxe0LaOGeguUidbq6vis="  />

        </Head>
        <Navbar user={user}></Navbar>
        <main>
            <div className="flex flex-col md:flex-row">
            <Sidebar/>
            <section>
                <div id="main" className="main-content flex-1 bg-gray-100 mt-12  pb-24 md:pb-5">
                    {children}
                </div>
            </section>
            
            </div>
        </main>
        <Script src='assets/js/scripts.js'></Script>
        </>
    )
}

export default MainLayout;