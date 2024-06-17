import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";

config();


mongoose.connect(`${process.env.DB_URL}`)
    .then(() => console.log("Succed"))
    .catch((err) => console.log(err));
