import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";


const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleOtpSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/otp/verify-otp", { email, otp: otpCode });
      if (res.data.success) {
        toast.success("Email verified successfully.");
        navigate("/signup", { state: { emailVerified: true } });
      } else {
        toast.error(res.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            className="border border-gray-300 rounded-md text-center w-8 h-8"
          />
        ))}
      </div>

      <button onClick={handleOtpSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Submit OTP
      </button>
    </div>
  );
};

export default OTPVerification;
