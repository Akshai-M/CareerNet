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
        
        
        <div className="mt-4">
          <h1 className="font-medium textcolor text-xl">{job?.title}</h1>
          <p className="text-sm text-gray-400 mt-2">{job?.description}</p>
        </div>
        
        
      </div>
    </div>
  );
};

export default LatestJobCards;
