import React from 'react'
import Router from 'next/router'
import { ProtectRoute } from '../contexts/auth'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css';
import '../styles/nucleo-icons.css';
import '../styles/nucleo-svg.css';
import '../styles/soft-ui-dashboard-tailwind.css?v=1.0.4';






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