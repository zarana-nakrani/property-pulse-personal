import connectDB from "@/config/database";
import { Property } from '@/models/Property'
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
export const GET = async (request: NextRequest, { params }: {
    params: {userId: string}
}) => {
    try{
        await connectDB();

        const userId = params.userId;
        if(!userId){
            return new Response('User ID is required', {status: 400});
        }

        const properties = await Property.find({owner: userId});

        //Sort properties by date

        return new Response(JSON.stringify(properties), {status: 200});
    } catch(error) {
        return new Response("Something went wrong", {status: 500});
    }
} 