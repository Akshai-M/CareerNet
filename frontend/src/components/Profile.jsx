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
            
           
      
            
      
            
      
            
          </div>
      
          
            <AppliedJobTable />
      
          <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
      );
      
};

export default Profile;
