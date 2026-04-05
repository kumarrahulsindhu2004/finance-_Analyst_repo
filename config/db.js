import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb Connected ${conn.connection.host}`)
    } catch (error) {
        console.log("Database Connection failed")
        console.error(error.message)
    }
}

export default connectDB