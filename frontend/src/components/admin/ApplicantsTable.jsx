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
