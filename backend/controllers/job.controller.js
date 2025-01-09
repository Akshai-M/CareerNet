import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    
}


export const getAllJobs = async (req, res) => {
    
}


export const getJobById = async (req, res) => {
    
}


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
