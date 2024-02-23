import { mongoose } from "mongoose";

export const db = async () => {
    try {
       await mongoose.connect(process.env.mongo_URI)
        console.log('MongoDB Connected')
    }
    catch(err) {
        console.log(err)
    }
} 