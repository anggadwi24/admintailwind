import Head from "next/head"
import Script from "next/script";

export default function HeadMeta(props) {
  return (
    <Head>
        <title>{props.title}</title>
        <link rel="shortcut icon" href="/assets/img/fav.png" type="image/x-icon"/>  
        <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.12.1/css/pro.min.css"/>
 
    </Head>
  )
}