import mongoose from "mongoose";

export async function connect_db() {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
