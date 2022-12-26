import Head from "next/head"
import Script from "next/script";

export default function HeadMeta(props) {
  return (
    <>
       <Head>
        <title>{props.title}</title>
        <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/x-icon"/>  
     
        

    </Head>
   
    </>
   
  )
}