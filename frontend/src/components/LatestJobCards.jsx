import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-gray-400 p-[2px] rounded-3xl">
      <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="max-w-lg mx-auto dark:bg-black shadow-lg rounded-3xl p-6 cursor-pointer "
      >
        <div className="flex items-center space-x-4 ">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} className="w-10 h-10 " />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium textcolor text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="font-medium textcolor text-xl">{job?.title}</h1>
          <p className="text-sm text-gray-400 mt-2">{job?.description}</p>
        </div>
        
        <div className="flex items-center gap-10 mt-4">
          <Badge className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md" variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
