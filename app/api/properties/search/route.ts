import connectDB from "@/config/database";
import { Property } from "@/models/Property";

//GET /api/properties/search

export const GET = async (request: Request) => {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const propertyType = searchParams.get('propertyType');

        const locationPattern = new RegExp(location ? location : '', 'i');

        //Match location pattern against database fields
        let query = {
            $or: [
                { name: locationPattern },
                { description: locationPattern },
                { 'location.street': locationPattern },
                { 'location.city': locationPattern },
                { 'location.state': locationPattern },
                { 'location.zipcode': locationPattern },
                {type : ''}
            ]
        }

        //Only check for properties if its not 'All'
        if(propertyType && propertyType !== 'All') {
            const typePattern = new RegExp(propertyType, 'i');
            (query as any).type = typePattern
        }

        const properties = await Property.find(query);
        console.log(location, propertyType);

        return new Response(JSON.stringify(properties), {status: 200});
    } catch (error) {
        return new Response('Something went wrong', {status: 500});
    }
}