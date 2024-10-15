import mongoose from "mongoose";

export async function connect(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL!}/${process.env.DB_NAME!}`);
    console.log(`Connected to Mongoose database! DB Host: ${connectionInstance.connection.host}`);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on("error", (err) => {
            console.error("MongoDB connection error,please make sure mongodb is running.", err);
            process.exit(1);
        });
    } catch (error) {

        console.log(error);
    }
}