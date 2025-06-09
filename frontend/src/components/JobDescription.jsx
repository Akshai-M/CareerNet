import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FaLongArrowAltLeft } from "react-icons/fa";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();

  const returnBack = () => navigate("/home");

  const availablePositions = (singleJob?.position ?? 0) - (singleJob?.applications?.length ?? 0);

  const isPositionsExhausted = availablePositions <= 0;

  const buttonDisabled = isApplied || isPositionsExhausted;

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        dispatch(setSingleJob(res.data.updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong during application.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const job = res.data.job;
          dispatch(setSingleJob(job)); 

          const hasUserApplied = job.applications?.some(
            (app) => app.applicant === user?._id
          );
          setIsApplied(hasUserApplied);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-10 px-6 text-center text-gray-500 dark:text-gray-400">
        Loading job details...
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="max-w-7xl mx-auto my-10 px-6 text-center text-red-500 dark:text-red-400">
        Job not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-6">
      <Button
        onClick={returnBack}
        className="flex items-center space-x-2 text-lg font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
      >
        <FaLongArrowAltLeft className="text-xl" />
        <span>Back</span>
      </Button>

      <div className="flex items-center justify-between my-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div>
          <h1 className="font-extrabold text-4xl text-gray-800 dark:text-white">
            {singleJob.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
          
            <Badge className="dark:bg-gray-700 text-blue-700 dark:text-blue-300 font-semibold px-4 py-2 rounded-md" variant="ghost">
              {availablePositions > 0 ? `${availablePositions} Position${availablePositions === 1 ? "" : "s"} Available` : "No Positions Available"}
            </Badge>
            <Badge className="dark:bg-gray-700 text-blue-700 dark:text-blue-300 font-semibold px-4 py-2 rounded-md" variant="ghost">
              {singleJob.jobType}
            </Badge>
            <Badge className="dark:bg-gray-700 text-blue-700 dark:text-blue-300 font-semibold px-4 py-2 rounded-md" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={buttonDisabled ? null : applyJobHandler} 
          disabled={buttonDisabled} 
          className={`rounded-lg py-3 px-8 font-semibold text-white transition-all duration-200 ease-in-out ${
            buttonDisabled
              ? "bg-gray-600 dark:bg-gray-700 cursor-not-allowed opacity-70"
              : "bg-blue-600 hover:bg-blue-500" 
          }`}
        >
          {isApplied
            ? "Already Applied"
            : isPositionsExhausted
            ? "No Positions Available"
            : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-gray-300 dark:border-gray-700 font-medium py-4 text-2xl mt-6 text-gray-800 dark:text-white">
        Job Description
      </h1>

      <div className="my-6 space-y-4">
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Role:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.title || 'N/A'}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Location:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.location || 'N/A'}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Description:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.description || 'N/A'}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Experience:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {`${singleJob.experienceLevel} Yr(s)` || 'N/A'}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Salary:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.salary ? `${singleJob.salary} LPA` : 'N/A'}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.applications?.length ?? 0}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Posted Date:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.createdAt ? singleJob.createdAt.split("T")[0] : 'N/A'}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Skills Required:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob.requirements?.length > 0 ? singleJob.requirements.join(", ") : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;