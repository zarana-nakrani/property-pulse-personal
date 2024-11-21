import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' //had to add this line to make react-toastify work 
import Footer from '@/components/Footer'

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, fond properties',
}

type props = {}

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout
