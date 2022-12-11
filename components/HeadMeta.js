import Head from "next/head"
import Script from "next/script";

export default function HeadMeta(props) {
  return (
    <Head>
        <title>{props.title}</title>
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
        <link 
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" 
        />
        <Script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></Script>
        <link  
            rel="stylesheet"
            href="https://afeld.github.io/emoji-css/emoji.css"
        />
  
        <Script src="https://unpkg.com/@popperjs/core@2"></Script>
 
    </Head>
  )
}