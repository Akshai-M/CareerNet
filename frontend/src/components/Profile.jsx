import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

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
                <div>
                  <h1 className="font-medium text-2xl text-gray-800 dark:text-white">{user?.fullname}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.profile?.bio}</p>
                </div>
              </div>
              <Button onClick={() => setOpen(true)} className="text-right p-3" variant="outline">
                <Pen />
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
      
            
      
            
          </div>
      
          
            <AppliedJobTable />
      
          <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
      );
      
};

export default Profile;
