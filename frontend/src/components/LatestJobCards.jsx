import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

import { Avatar, AvatarImage } from './ui/avatar';
import { useSelector } from "react-redux";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  const availablePositions = (job?.position || 0) - (job?.applications?.length || 0);
  const isJobUnavailable = availablePositions <= 0;

  const cardClasses = `
    max-w-lg mx-auto bg-white dark:bg-black shadow-lg rounded-3xl p-6
    ${isJobUnavailable ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
  `;

  const handleCardClick = () => {
    if (!isJobUnavailable) {
      navigate(`/description/${job._id}`);
    }
  };

  return (
    <div className="dark:bg-gray-400 p-[2px] rounded-3xl">
      <div
        onClick={handleCardClick}
        className={cardClasses}
      >
        <div className="flex items-center space-x-4 ">
          <Button className="p-6 bg-black" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} className="w-10 h-10" />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium dark:text-white text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-medium dark:text-white text-xl">{job?.title}</h1>
          <p className="text-sm text-gray-400 mt-2">{job?.description}</p>
        </div>

        <div className="flex items-center gap-10 mt-4">
          <Badge className="dark:bg-gray-400 text-blue-700 font-bold px-3 py-1 rounded-md" variant="ghost">
            {availablePositions} Positions
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