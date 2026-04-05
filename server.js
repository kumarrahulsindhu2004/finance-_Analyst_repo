import express from "express";
import connectDB from "./config/db.js";
import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.route.js"
import recordRoutes from "./routes/record.route.js"
configDotenv();

const app = express();

// connect DB
connectDB()

app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/records",recordRoutes)


// Test Port 
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})