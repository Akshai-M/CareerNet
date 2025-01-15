import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className="max-w-4xl mx-auto my-6 p-6 border border-white rounded-xl shadow-lg dark:bg-gray-800">
          <Table>
            <TableCaption className="text-lg font-semibold dark:text-white">A list of your applied jobs</TableCaption>
            <TableHeader>
              <TableRow className="text-gray-700 dark:text-gray-300">
                <TableHead className="font-medium text-left">Date</TableHead>
                <TableHead className="font-medium text-left">Job Role</TableHead>
                <TableHead className="font-medium text-left">Company</TableHead>
                <TableHead className="font-medium text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.length <= 0 ? (
                
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <TableRow key={appliedJob._id}>
                    <TableCell className="text-gray-700 dark:text-gray-300">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{appliedJob.job?.title}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{appliedJob.job?.company?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={`${
                          appliedJob?.status === "rejected"
                            ? "bg-red-500 text-white"
                            : appliedJob.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-green-500 text-white"
                        } px-3 py-1 rounded-full text-xs font-semibold`}
                      >
                        {appliedJob.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            
          </Table>
        </div>
      );
      
}

export default AppliedJobTable