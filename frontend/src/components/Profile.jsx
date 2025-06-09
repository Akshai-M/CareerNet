import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Edit, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto dark:bg-gray-900 border border-gray-300 rounded-2xl my-6 p-8 shadow-lg">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-blue-500 rounded-full shadow-lg">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="sm"
            className="self-start sm:self-auto"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="my-6">
          <div className="flex items-center gap-3 my-3 text-gray-700 dark:text-gray-300">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-3 text-gray-700 dark:text-gray-300">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-6">
          <h1 className="font-semibold text-xl text-gray-800 dark:text-white">
            Skills
          </h1>
          <div className="flex items-center gap-2 my-3">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-4 py-1 text-sm font-medium bg-blue-200 text-blue-800 rounded-full"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600 dark:text-gray-400">NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 my-5">
          <Label className="text-md text-gray-800 dark:text-white font-bold">
            Resume
          </Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">NA</span>
          )}
        </div>
      </div>

      <AppliedJobTable />

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
