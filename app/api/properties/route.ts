import connectDB from "@/config/database";
import { Property } from '@/models/Property'
import { NextRequest } from "next/server";
import type { UserSession } from "@/utils/authOptions";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/dist/server/api-utils";
import cloudinary from "@/config/cloudinary";
//Alternate way of customizing Session type

// declare module "next-auth" {
//     interface Session {
//       user: {
//         id: string; // Add id property to user object
//       } & DefaultSession["user"];
//     }
//   }
//we are using getServerSession to get the user information like user ID if the user is authenticated
export const dynamic = 'force-dynamic';
export const GET = async (request: NextRequest) => {

    try{
        await connectDB();

        const page = Number.parseInt(request.nextUrl.searchParams.get('page') || '1') ;
        const pageSize = Number.parseInt(request.nextUrl.searchParams.get('pageSize') || '3') ;

        const skip = (page - 1) * pageSize

        const totalProperties = await Property.countDocuments({});
        const properties = await Property.find({}).skip(skip).limit(pageSize);

        const result = {
            totalProperties,
            properties
        }

        //Sort properties by date

        return new Response(JSON.stringify(result), {status: 200});
    } catch(error) {
        return new Response("Something went wrong", {status: 500});
    }
} 

export const POST = async (request: NextRequest) => {
    try {

        await connectDB(); 
        
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response('User Id is required', {status: 401})
        }
        const { userId } = sessionUser
        // const userId = (session as UserSession).user?.id;
        const formData = await request.formData();

        //Access all values from amenities and images
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter((image): image is File => image instanceof File).filter((file) => file.name !== '');

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
            images: [""]
            // images, to save the images to database it has to be array of string and not array of files which we are getting right now
        };

        //Upload image(s) to cloudinary
        const imageUploadPromises = [] //this array will store the URL returned by cloudinary

        for(const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            //Convert the image data to base64
            const imageBase64 = imageData.toString('base64');

            //make request to upload to Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder: 'propertyPulse',
                }
            )
            imageUploadPromises.push(result.secure_url)

            //Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises);
            //Add uploaded images to the propertyData
            propertyData.images = uploadedImages;
        }

        // console.log(propertyData)
        // return new Response(JSON.stringify({message: 'successful'}), { status: 200 });

        const newProperty = new Property(propertyData);
        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
    } catch (error) {
        return new Response('failed to add property', {status: 500});
    }
}

//PUT /api/properties/:id