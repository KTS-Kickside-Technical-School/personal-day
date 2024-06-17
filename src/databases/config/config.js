import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";

config();


mongoose.connect(`${process.env.DB_URL}`)
    .then(() => console.log("Database Connected successfully"))
    .catch((err) => console.log("Databse connection failed", err));
