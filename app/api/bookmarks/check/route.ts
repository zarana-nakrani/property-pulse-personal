import connectDB from '@/config/database'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'
import { NextApiRequest } from 'next'


export const dynamic = 'force-dynamic';

export const POST = async (request: Request ) => {
    try {
        await connectDB();
        const { propertyId } = await request.json();
        const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('UserId is required', {status: 401})
    }

    const {userId} = sessionUser
    
    //Find the user in the database
    const user = await User.findById(userId);
    
    //Check if property is already bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    
    return new Response(JSON.stringify({ isBookmarked}), { status: 200});

} catch (error) {
    console.log(error)
    return new Response('Something went wrong', {status: 500})
  }
}
