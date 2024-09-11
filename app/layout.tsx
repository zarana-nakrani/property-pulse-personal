import React, { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, fond properties',
};

type props = {}

const MainLayout  = ({children} : {
    children: ReactNode
} ) => {
  return (
    <html lang='en'>
        <body>
            <Navbar />
            <main>{children}</main>
        </body>
    </html>
  )
}

export default MainLayout