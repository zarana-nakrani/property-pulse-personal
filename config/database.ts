import mongoose from "mongoose";
let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    //If the database is connected, dont connect again. we are trying to make serverless application here because we dont have anything like express server set up that will connect with database. When next api route is hit it will automatically make a connection with server.
    if(connected){
        console.log("Mongodb is already connected");
        return true;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL ?? "");
        connected = true;
        console.log('Mongodb connected...');
    }catch(error){
        console.log(error);
    }
}

export default connectDB;