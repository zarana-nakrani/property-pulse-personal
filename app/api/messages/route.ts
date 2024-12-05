import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';


//GET /api/messages

export const GET = async (request: Request) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.user) {
            return new Response('User ID is required', {status: 401})
        } 

        const { userId } = sessionUser;

        const readMessages = await Message.find({ recipient: userId, read: true})
        .sort({createdAt: -1}) //Sort read messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name');

        const unreadMessages = await Message.find({ recipient: userId, read: false})
        .sort({createdAt: -1}) //Sort read messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name');

        const messages = [...unreadMessages, ...readMessages]

        return new Response(JSON.stringify({messages}), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 401});        
    }
}

//POST /api/messages
export const POST = async (request: Request) => {

    try {
        await connectDB();
        const {name, email, phone, message, recipient, property} = await request.json();

        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({Message: 'You must be logged in to send the message'}), {status: 401})
        } 

        const { user } = sessionUser;
        
        //Cannot send message to self
        if(user.id === recipient) {
            return new Response(JSON.stringify({Message: 'Cannot send a message to yourself'}), {status: 400})
        }

        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            name, 
            email,
            phone,
            body: message,
        })

        await newMessage.save();

        return new Response(JSON.stringify({message: 'Message Sent '}), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', {status: 401});
    }
}