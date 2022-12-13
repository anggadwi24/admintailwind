import Head from "next/head"
import Script from "next/script";

export default function HeadMeta(props) {
  return (
    <>
       <Head>
        <title>{props.title}</title>
        <link rel="shortcut icon" href="/assets/img/fav.png" type="image/x-icon"/>  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"/>
        

    </Head>
   
    </>
   
  )
}