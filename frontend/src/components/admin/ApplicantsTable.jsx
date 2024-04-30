import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

import axios from "axios";
const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto ">
        <Table className="min-w-full border dark:bg-gray-800 rounded-3xl outline-none  ">
          <TableCaption className="text-lg font-semibold text-gray-600">
            A list of your recent applied users
          </TableCaption>
          <TableHeader >
         
          </TableHeader>
          <TableBody>
            {applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow
                  key={item._id}
                  
                >
                  <TableCell className="py-2 px-4">
                    {item?.applicant?.fullname}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {item?.applicant?.email}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {item?.applicant?.phoneNumber}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-500 underline hover:text-blue-700"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-gray-500">NA</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {item?.applicant?.profile?.skills?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.applicant.profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="dark:bg-gray-200 dark:text-black text-sm px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">NA</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {new Date(item?.applicant.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-right">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer p-2 rounded-full ">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-40 dark:bg-black shadow-md rounded-md p-2">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item?._id)}
                            className="flex items-center gap-2 px-2 py-1 rounded dark:textcolor cursor-pointer"
                          >
                            <span>{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-4 text-center text-gray-500"
                >
                  No applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
       
      </div>
    </div>
  );
  
  
};

export default ApplicantsTable;
