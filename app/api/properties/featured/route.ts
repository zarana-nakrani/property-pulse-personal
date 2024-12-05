import connectDB from "@/config/database";
import { Property } from '@/models/Property'
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

//GET /api/properties/featured
export const GET = async (request: NextRequest) => {

    try{
        await connectDB();
        const properties = await Property.find({
            is_featured: true,
        });

        return new Response(JSON.stringify(properties), {status: 200});
    } catch(error) {
        return new Response("Something went wrong", {status: 500});
    }
} 