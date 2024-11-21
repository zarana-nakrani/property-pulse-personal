import connectDB from '@/config/database'
import User from '@/models/User'
import { Property } from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { NextApiRequest } from 'next'


export const dynamic = 'force-dynamic';


// GET /api/bookmarks
export const GET = async (request: Request) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('UserId is required', {status: 401})
    }

    const {userId} = sessionUser;
    
    //Find the user in the database
    const user = await User.findById(userId);
    console.log(user)

    //Get user bookmarks
    const bookmarks = await Property.find({_id: {$in: user.bookmarks}});
    console.log(bookmarks);
    return new Response(JSON.stringify(bookmarks), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {status: 500});
    }
}

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
    let message;
    if(isBookmarked){
        user.bookmarks.pull(propertyId)
        message = 'Bookmark removed successsfully'
        isBookmarked = false;
    } else {
        user.bookmarks.push(propertyId);
        message = 'Bookmark added successfully';
        isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({message, isBookmarked}), { status: 200});

} catch (error) {
    console.log(error)
    return new Response('Something went wrong', {status: 500})
  }
}
