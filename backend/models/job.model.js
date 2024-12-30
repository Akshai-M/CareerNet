import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);