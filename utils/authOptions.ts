import connectDB from '@/config/database'
import User, { IUser } from '@/models/User'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import type { Profile, Session } from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import { DefaultSession } from 'next-auth'


export interface UserSession extends Session {
    user: {
        id: string
    } & DefaultSession['user']
}


// interface profile extends GoogleProfile {

// }
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: 'offline',
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        //Invoked on successful signin
        async signIn({profile} : {profile?: GoogleProfile | Profile | undefined}){
            //1. Connect to database
            await connectDB();
            //2. Check if user exists
            const userExists = await User.findOne({email: profile?.email});
            //3. If not, then add user to database
            if(!userExists){
                //Truncate username if too long
                console.log(profile)
                const username = profile?.name?.slice(0, 20);
                await User.create({
                    email: profile?.email,
                    username,
                    image: (profile as GoogleProfile)?.picture,
                })
            }
            //4. Return true to allow sign in
            return true;
        },

        //Modifies the session object
        async session({ session }: {session: Session | UserSession}){
            //1. Get the user from database
            const user = await User.findOne({email: session.user?.email});
            //2. Assign the user id to the session
            session.user ? (session as UserSession).user.id = user._id.toString() : null;
            //3. Return Session
            return session
        }
    }
}