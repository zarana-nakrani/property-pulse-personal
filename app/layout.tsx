import React, { ReactNode } from 'react';
import '@/assets/styles/globals.css';

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
            <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout