import { mongoose } from "mongoose";

export const db = async () => {
    try {
       await mongoose.connect(process.env.new_Mongo)
        console.log('MongoDB Connected')
    }
    catch(err) {
        console.log(err)
    }
} 