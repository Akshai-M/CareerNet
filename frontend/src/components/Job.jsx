import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl dark:bg-black border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm dark:text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm dark:text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-blue-600 dark:textcolor">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
