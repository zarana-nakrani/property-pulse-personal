import connectDB from "@/config/database";
import {Property, DeletedProperty, IProperty, ModifiedProperty } from '@/models/Property'
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";


//GET /api/properties/:id 
export const GET = async (request: NextRequest, { params }: {
    params: {id: string}
}) => {
    try{
        await connectDB();
        const property = await Property.findById(params.id);
        if(!property) return new Response('Property Not Found', {status: 404})

        //Sort properties by date

        return new Response(JSON.stringify(property), {status: 200});
    } catch(error) {
        return new Response("Something went wrong", {status: 500});
    }
} 

//DELETE /api/properties/:id 
export const DELETE = async (request: NextRequest, { params }: {
    params: {id: string}
}) => {
    try{
        const propertyId = params.id;

        const sessionUser = await getSessionUser();

        //CHeck for session
        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required', {status: 401});
        }

        const { userId } = sessionUser;

        await connectDB();
        const property = await Property.findById(propertyId);
        if(!property) return new Response('Property Not Found', {status: 404})

        //verify ownership
        if(property.owner.toString() !== userId){
            return new Response('Unauthorized', {status: 401})
        }
        const newDeletedProperty = new DeletedProperty({
            ...property.toObject(),
            isDeleted: true})
        await newDeletedProperty.save();

        await property.deleteOne();

        return new Response('Property Deleted', {status: 200});
    } catch(error) {
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
} 


//PUT /api/properties/:id
export const PUT = async (request: NextRequest, {params}: {
    params: {
        id: string;
    }
}) => {
    try {

        await connectDB(); 
        
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response('User Id is required', {status: 401})
        }

        const {id} = params;
        const { userId } = sessionUser
        // const userId = (session as UserSession).user?.id;

        //Get the property to be updated
        const existingProperty = await Property.findById(params.id) 

        if(!existingProperty){
            return new Response('Property does not exist', {status: 404})
        }

        
        //verify Ownership
        if(existingProperty?.owner.toString() !== userId){
            return new Response('Unauthorized', {status: 401})
        }

        const modifiedProperty = new ModifiedProperty({
            ...existingProperty.toObject(),
            isModified: true,
        });

        await modifiedProperty.save();

        const formData = await request.formData();

        //Access all values from amenities and images
        const amenities = formData.getAll('amenities');
        // const images = formData.getAll('images').filter((image): image is File => image instanceof File).filter((file) => file.name !== '');

        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location:{
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
            // images: [""]
            // images, to save the images to database it has to be array of string and not array of files which we are getting right now
        };


        //Update Property in database
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

        return new Response(JSON.stringify(updatedProperty), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('failed to add property', {status: 500});
    }
}