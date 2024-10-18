"use client"
//we are wrapping the layout in AuthProvider because whne we use Session Provider we need to make the layout client-de renderring which we dont want to do thats why we first wrap the layout in AuthProvider and make it client side. Also SessionProvider is React Context which is used to share 'session' acroos components.
import { SessionProvider } from 'next-auth/react'

type Props = {}

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  return (
    <SessionProvider>{ children }</SessionProvider>
  )
};

export default AuthProvider