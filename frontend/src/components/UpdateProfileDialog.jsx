import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="dark:bg-black bg-white dark:textcolor text-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl dark:textcolor text-black font-semibold mb-4">
            Update Profile
          </h2>
          <Button className="text-black dark:text-white" onClick={() => setOpen(false)} variant="ghost" size="icon">
            <IoIosClose />
          </Button>
        </div>

        <form onSubmit={submitHandler} className="dark:textcolor text-black space-y-4">
          <div>
            <Label className="dark:textcolor text-black">Name</Label>
            <Input
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="dark:bg-black bg-white"
            />
          </div>
          <div>
            <Label className="dark:textcolor text-black">Email</Label>
            <Input
              name="email"
              type="email"
              readOnly={true}
              value={input.email}
              onChange={changeEventHandler}
              className="dark:bg-black bg-white cursor-not-allowed"
            />
          </div>
          <div>
            <Label className="dark:textcolor text-black">Phone Number</Label>
            <Input
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              readOnly={true}
              className="dark:bg-black bg-white cursor-not-allowed "
            />
          </div>
          <div>
            <Label className="dark:textcolor text-black">Bio</Label>
            <Input
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="dark:bg-black bg-white"
            />
          </div>
          <div>
            <Label className="dark:textcolor text-black">Skills (comma separated)</Label>
            <Input
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className="dark:bg-black bg-white"
            />
          </div>
          <div>
            <Label className="dark:textcolor text-black">Resume</Label>
            <Input
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="dark:bg-black bg-white"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 dark:textcolor"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
