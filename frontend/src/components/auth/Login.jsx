import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/home");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      
      <div className="flex items-center justify-center mt-40">
        <form
          onSubmit={submitHandler}
          className="form-container shadow-[0_4px_12px_rgba(0,0,0,0.4)]  "
        >
          <h1 className="font-extrabold text-4xl mb-5 text-blue-600 text-center">Login</h1>
          <div className="my-2">
            
            <div className="divinput ">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 ml-2 mr-4" />
              <input
              className="input"
              type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Email"
              />
            </div>
          </div>

          <div className="my-2 relative py-4">
            
            <div className="divinput ">
            <FontAwesomeIcon icon={faLock} className="text-gray-500 ml-2 mr-4" />

              <input
                type={showPassword ? "text" : "password"}
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
                className="input"
                />
              <div
                className="flex cursor-pointer  ml-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5  text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </div>

            </div>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5 ">
              <div className="flex items-center space-x-2">
                <input
                
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer  "
                />

                <Label htmlFor="r1" className='textcolor'>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer "
                />

                <Label htmlFor="r2" className='textcolor'>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="my-3 w-full hover:bg-blue-400 bg-blue-600 text-white  rounded">
              Login
            </Button>
          )}
          <span className="text-sm textcolor">
            Don't have an account?{" "}
            <Link to="/signup" className="spancolor hover:underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
