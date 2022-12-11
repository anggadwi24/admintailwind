import React from 'react'
import Router from 'next/router'
import { ProtectRoute } from '../contexts/auth'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css';
// import '../styles/style.css';







function MyApp({ Component, pageProps }) {

    return (
      <AuthProvider>
        <ProtectRoute>
            <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
    )
}


export default MyApp