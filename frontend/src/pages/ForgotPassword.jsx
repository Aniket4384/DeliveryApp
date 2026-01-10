import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIXED: Get token from URL query parameters (BrowserRouter)
  useEffect(() => {
    console.log("🔍 Checking URL for token...");
    
    // Method 1: Using useLocation from React Router
    console.log("Router location search:", location.search);
    
    const params = new URLSearchParams(location.search);
    const tokenFromParams = params.get('token');
    
    if (tokenFromParams) {
      console.log("✅ Token from useLocation:", tokenFromParams.substring(0, 30) + "...");
      setToken(tokenFromParams);
      return;
    }
    
    // Method 2: Fallback to window.location
    console.log("Window location href:", window.location.href);
    console.log("Window location search:", window.location.search);
    
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromWindow = urlParams.get('token');
    
    if (tokenFromWindow) {
      console.log("✅ Token from window.location:", tokenFromWindow.substring(0, 30) + "...");
      setToken(tokenFromWindow);
      return;
    }
    
    console.log("ℹ️ No token found in URL");
  }, [location]);

  // Send reset link
  const sendLink = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMsg("");
    
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/forgot-password",
        { email },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      setMsg("✅ " + res.data.message);
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Failed to send reset link"));
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (e) => {
    if (e) e.preventDefault();
    
    if (!token) {
      setMsg("❌ No reset token found. Please use the link from your email.");
      return;
    }
    
    if (!newPassword || !confirmPassword) {
      setMsg("❌ Please enter and confirm your new password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMsg("❌ Passwords do not match");
      return;
    }
    
    if (newPassword.length < 6) {
      setMsg("❌ Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    setMsg("");

    try {
      console.log("📤 Sending to backend - Token length:", token.length);
      
      const res = await axios.post(
        "http://localhost:8080/auth/reset-password",
        {
          token: token,
          newPassword: newPassword,
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setMsg("✅ " + res.data.message);
      
      // Clear token from URL after successful reset
      window.history.replaceState({}, document.title, "/forgot-password");
      
      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      console.error("Backend error:", err.response?.data);
      setMsg("❌ " + (err.response?.data?.message || "Reset failed"));
    } finally {
      setLoading(false);
    }
  };

  // Determine what to show
  const showResetForm = !!token;

  return (
    <div className="flex items-center w-full justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <IoArrowBack
            className="text-[#2ECC71] text-2xl cursor-pointer hover:text-[#27AE60] transition-colors"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-[#2ECC71]">
            {showResetForm ? "Reset Password" : "Forgot Password"}
          </h1>
        </div>

        {/* Message Display */}
        {msg && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            msg.includes("✅") 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {msg}
          </div>
        )}

        {/* Debug info - Only show in development */}
        {process.env.NODE_ENV === 'development' && token && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200">
            <p className="font-semibold">🔍 Debug Info</p>
            <p className="mt-1">Token detected: {token ? "Yes" : "No"}</p>
            <p>Token length: {token?.length} characters</p>
            <p className="mt-1 break-all text-[10px]">
              Token preview: {token?.substring(0, 30)}...
            </p>
          </div>
        )}

        {/* Email Form (show if NO token) */}
        {!showResetForm && (
          <form onSubmit={sendLink}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                loading || !email
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 active:scale-[0.98] shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p className="mt-4 text-sm text-gray-600 text-center">
              We'll email you a secure reset link that expires in 10 minutes.
            </p>
          </form>
        )}

        {/* Reset Password Form (show if token exists) */}
        {showResetForm && (
          <form onSubmit={resetPassword}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter new password (min. 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 active:scale-[0.98] shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              After resetting, you'll be redirected to the login page.
            </p>
          </form>
        )}

        {/* Back to login link */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={() => navigate("/signin")}
            className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;