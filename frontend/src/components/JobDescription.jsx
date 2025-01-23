import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/home");
  };
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-6">
      <Button
        onClick={returnBack}
        className="flex items-center space-x-2 text-lg font-semibold text-gray-500 hover:text-black transition-colors duration-300"
      >
        <FaLongArrowAltLeft className="text-xl" /> <span>Back</span>
      </Button>

      <div className="flex items-center justify-between my-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div>
          <h1 className="font-extrabold text-4xl text-gray-800 dark:text-white">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <Badge
              className="dark:bg-gray-400 text-blue-700 font-semibold px-4 py-2 rounded-md"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="dark:bg-gray-400 text-blue-700 font-semibold px-4 py-2 rounded-md"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="dark:bg-gray-400 text-blue-700 font-semibold px-4 py-2 rounded-md"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg py-3 px-8 font-semibold text-white transition-all duration-200 ease-in-out ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-gray-300 font-medium py-4 text-2xl mt-6 text-gray-800 dark:text-white">
        Job Description
      </h1>

      <div className="my-6 space-y-4">
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Role:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.title}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Location:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.location}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Description:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.description}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Experience:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.experienceLevel} yrs
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Salary:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.salary} LPA
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.applications?.length}
          </span>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          Posted Date:
          <span className="pl-4 font-normal text-gray-700 dark:text-gray-400">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
