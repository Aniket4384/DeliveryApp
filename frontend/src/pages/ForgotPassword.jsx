import React from "react";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const primaryColor = "#2ECC71";
  const hoverColor = "#27AE60";
  const bgColor = "#fff9f6";
  const borderColor = "#DDEEE3";
  const [move, setMove] = useState(1);
  const [email, setEmail] = useState("");
  const[otp,setOtp] = useState("")
  const[newPassword, setnewPassword] = useState("")
  const[confirmPassword,setconfirmPassword] = useState("")
  const navigate = useNavigate()
  return (
    <div className="flex items-center w-full justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-4">
          <IoArrowBack className="text-[#2ECC71] size={30} cursor-pointer" onClick={()=>navigate("/signin")} />
          <h1 className="text-2xl font-bold text-center text-[#2ECC71] ">
            Forgot Password
          </h1>
        </div>
        {move == 1 && (
          <div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
               onChange={(e)=> setEmail(e.target.value)} value={email}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              />
            </div>

            <button
              type="button"
             
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              Send OTP
            </button>
          </div>
        )}
        {move == 2 && (
          <div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-semibold text-gray-700"
              >
                Enter OTP
              </label>
              <input
                id="email"
                name="email"
                type=""
                placeholder="Enter your otp"
                required
                onChange={(e)=> setOtp(e.target.value)} value={otp}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              />
            </div>

            <button
              type="button"
             
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Verify
            </button>
          </div>
        )}

         {move == 3 && (
          <div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="newPassword"
                className="mb-1 text-sm font-semibold text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter new paassword"
                required
                onChange={(e)=> setnewPassword(e.target.value)} value={newPassword}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              />
            </div>
             <div className="flex flex-col mb-4">
              <label
                htmlFor="newPassword"
                className="mb-1 text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter confirm paassword"
                required
                onChange={(e)=> setconfirmPassword(e.target.value)} value={confirmPassword}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              />
            </div>

            <button
              type="button"
             
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
