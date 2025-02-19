import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="dark:bg-black bg-white max-w-7xl justify-center items-center shadow-md px-5 mx-auto border border-[#707070] mt-5 rounded-lg">
      <div className="flex items-center justify-between h-16">
        <div>
          <h1 className="text-2xl font-bold font-sans dark:textcolor italic">
            Career<span className="spancolor">Net</span> 
          </h1>
        </div>
        <div className="flex items-center gap-12   px-8">
          <ul className="flex font-medium items-center gap-5 ">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <NavLink
                    to="/admin/companies"
                    className={({ isActive }) =>
                      `spancolor ${isActive ? "text-blue-600" : "text-blue-300"}`
                    }
                  >
                    {"<Companies/>"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/jobs"
                    className={({ isActive }) =>
                      `spancolor ${isActive ? "text-blue-600" : "text-blue-300"}`
                    }
                  >
                    {"<Jobs/>"}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `spancolor ${isActive ? "text-blue-600" : "text-blue-300"}`
                    }
                  >
                    {"<Home/>"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      `spancolor ${isActive ? "text-blue-600" : "text-blue-300"}`
                    }
                  >
                    {"<Jobs/>"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                      `spancolor ${isActive ? "text-blue-600" : "text-blue-300"}`
                    }
                  >
                    {"<Browse/>"}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          
            <Popover >
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <div className="">
                  <div className="flex gap-2  items-center">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium dark:textcolor">{user?.fullname}</h4>
                      <p className="text-sm dark:textcolor">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile" className="darl:textcolor">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <button onClick={logoutHandler} variant="link" className='dark:textcolor pl-4 hover:underline'>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
