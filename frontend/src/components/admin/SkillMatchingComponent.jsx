import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const SkillMatchingComponent = () => {
  const { applicants } = useSelector((store) => store.application);
  const pendingApplicants = applicants?.applications?.filter(item => item.status.toLowerCase() === "pending") || [];

  const statusHandler = async (status) => {
    if (pendingApplicants.length === 0) {
      toast.info("No pending applicants to update.");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/status/bulk-update`,
        {
          status,
          applicantIds: pendingApplicants.map((item) => item._id), // Sending all pending applicant IDs
        }
      );

      if (res.data.success) {
        toast.success(`All applicants marked as ${status.toLowerCase()}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 inline-flex">
        <input
          type="text"
          placeholder="Enter skills (comma-separated)"
          
          className="border p-2 w-full"
        />
        <button
          className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          
        >
          Filter Applicants
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full border dark:bg-gray-800 rounded-3xl outline-none">
          <TableCaption className="text-lg font-semibold text-gray-600">
            A list of your recent applied users
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="py-2 px-4">Resume</TableHead>
              <TableHead className="py-2 px-4">Status</TableHead>
              {pendingApplicants.length > 0 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => statusHandler("Accepted")}
          >
            Accept All
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => statusHandler("Rejected")}
          >
            Reject All
          </button>
        </div>
      )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingApplicants.length > 0 ? (
              pendingApplicants.map((item) => (
                <TableRow key={item._id}>
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
                    {item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="py-4 text-center text-gray-500">
                  No pending applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      
    </div>
  );
};

export default SkillMatchingComponent;

