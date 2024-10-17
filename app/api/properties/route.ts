import connectDB from "@/config/database";
import Property from '@/models/Property'

export const GET = async (request: any) => {
    try{
        await connectDB();
        const properties = await Property.find({});

        //Sort properties by date

        return new Response(JSON.stringify(properties), {status: 200});
    } catch(error) {
        return new Response("Something went wrong", {status: 500});
    }
} 