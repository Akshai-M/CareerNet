import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 text-4xl font-bold font-serif  bg-gradient-to-r from-blue-700 via-purple-400 to-[#ee622f] text-transparent bg-clip-text">
          Hi,{user?.fullname}!
        </span>
        
        
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs by role"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none bg-transparent  border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-blue-600 hover:bg-blue-400"
          >
            <Search className="h-5 w-5 " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
