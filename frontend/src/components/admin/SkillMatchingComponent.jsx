import React, { useState } from "react";
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const SkillMatchingComponent = () => {
  const { applicants } = useSelector((store) => store.application);
  const [skills, setSkills] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const pendingApplicants = applicants?.applications?.filter(item => item.status.toLowerCase() === "pending") || [];

  const handleFilter = async () => {
    if (!skills.trim()) {
      toast.error("Enter skills before filtering.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/filter-applicants`,
        { skills, applicants: pendingApplicants }
      );

      if (res.data.success) {
        setFilteredApplicants(res.data.filteredApplicants);
        setFilterActive(true);
      }
    } catch (error) {
      toast.error("Error filtering applicants.");
    }
  };

  const statusHandler = async (status) => {
    const selectedApplicants = filterActive ? filteredApplicants : pendingApplicants;
    if (selectedApplicants.length === 0) {
      toast.info("No applicants to update.");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/status/bulk-update`,
        {
          status,
          applicantIds: selectedApplicants.map((item) => item._id),
        }
      );

      if (res.data.success) {
        toast.success(`All applicants marked as ${status.toLowerCase()}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const displayedApplicants = filterActive ? filteredApplicants : pendingApplicants;

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter skills (comma-separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="border text-black rounded p-2 w-full"
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleFilter}
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedApplicants.length > 0 ? (
              displayedApplicants.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="py-2 px-4">
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-500 underline hover:text-blue-700"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resume
                      </a>
                    ) : (
                      <span className="text-gray-500">NA</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="py-4 text-center text-gray-500">
                  No applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {displayedApplicants.length > 0 && (
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
    </div>
  );
};

export default SkillMatchingComponent;
