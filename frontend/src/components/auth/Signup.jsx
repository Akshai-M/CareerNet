import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faPhone,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { BsPersonCircle } from "react-icons/bs";
import { RadioGroup } from "../ui/radio-group";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
    } else {
      setPreviewImage(null);
    }
    setInput({ ...input, file });
  };
  const validatePassword = (value) => {
    let error = "";
    const passLength = 8;
    if (value.length < passLength) {
      error = `Password must be at least ${passLength} characters long.`;
    } else if (!/[A-Z]/.test(value)) {
      error = "Password must include at least one upper case.";
    } else if (!/\d/.test(value)) {
      error = "Password must include at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      error = "Password must include at least one special character.";
    }
    setPasswordError(error);
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const requiredFields = {
      fullname: "Full Name",
      email: "Email",
      phoneNumber: "Phone Number",
      password: "Password",
      role: "Role",
    };

    for (const [field, name] of Object.entries(requiredFields)) {
      if (!input[field]) {
        toast.error(`${name} is missing`);
        return;
      }
    }
    if (!input.file) {
      toast.error("Profile picture is missing");
      return;
    }
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex  items-center justify-center mt-14">
      <form
        onSubmit={submitHandler}
        className="form-container  dark:bg-black bg-white border-2 rounded-xl border-blue-600"
      >
        <h1 className="font-extrabold  text-4xl mb-5 text-blue-600 text-center">
          Sign Up
        </h1>

        <div className="profile-picture-container">
          <label className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Selected"
                className=" profile-picture"
              />
            ) : (
              <BsPersonCircle
                size={120}
                className="dark:text-white text-black"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={changeFileHandler}
            />
          </label>
        </div>

        <div className="my-2">
          <div className="flex items-center border-2 rounded-lg p-[7px] border-[#4f77cd] dark:bg-black bg-white ">
            <FontAwesomeIcon
              icon={faFont}
              className="text-gray-500 ml-2 mr-4"
            />
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Full Name"
              className="dark:bg-black bg-white input"
            />
          </div>
        </div>

        <div className="my-2">
          <div className="flex items-center border-2 rounded-lg p-[7px] border-[#4f77cd] dark:bg-black bg-white ">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gray-500 ml-2 mr-4"
            />
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className=" dark:bg-black bg-white input"
            />
          </div>
        </div>

        <div className="my-2">
          <div className="flex items-center border-2 rounded-lg p-[7px] border-[#4f77cd] dark:bg-black bg-white ">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-gray-500 ml-2 mr-4"
            />
            <input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="xxxxxxxxxx"
              className="dark:bg-black bg-white input"
            />
          </div>
        </div>

        <div className="my-2 relative">
          <div className="flex items-center border-2 rounded-lg p-[7px] border-[#4f77cd] dark:bg-black bg-white ">
            <FontAwesomeIcon
              icon={faLock}
              className="text-gray-500 ml-2 mr-4"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create a password"
              className="dark:bg-black bg-white input"
            />
            <div
              className="flex  cursor-pointer ml-12"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
          {passwordError && (
            <div className="text-red-500 text-sm mt-2">{passwordError}</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="hidden peer"
              />
              <Label
                htmlFor="student"
                className={`cursor-pointer px-4 py-2 border-2 rounded 
                    peer-checked:bg-blue-600 peer-checked:text-white 
                    text-black dark:textcolor transition border-blue-600`}
              >
                Student
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="hidden peer"
              />
              <Label
                htmlFor="recruiter"
                className={`cursor-pointer px-4 py-2 border-2 rounded 
                    peer-checked:bg-blue-600 peer-checked:text-white 
                    text-black dark:textcolor transition border-blue-600`}
              >
                Recruiter
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="mt-3 w-full hover:bg-blue-400 bg-blue-600 text-white  rounded"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="mt-3 text-center dark:textcolor text-black text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline text">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
