import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const primaryColor = "#2ECC71";
const hoverColor = "#27AE60";
const bgColor = "#fff9f6";
const borderColor = "#DDEEE3";

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverGoogle, setHoverGoogle] = useState(false);
   const[error,setError] = useState("")

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleGoogle = async () => {
    try {
      // 1️ Create Google provider
      const provider = new GoogleAuthProvider();
  
      // 2️ Open Google login popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // 3️ Validate mobile AFTER login
  
      // 4️ Send user data to backend
      const { data } = await axios.post(
        `${serverUrl}/auth/google-auth`,
        {
          email: user.email,
        },
        { withCredentials: true }
      );
  
      console.log("Signup successful:", data);
  
      // 5️⃣ Optionally redirect user
      // navigate("/dashboard");
  
    } catch (err) {
      console.error("Google login/signup error:", err);
      setError(err)
      alert("Login failed. Try again!");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${serverUrl}/auth/signin`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
       
      );
       setError("")

      console.log("Signin Success:", response.data);
      navigate("/");

    } catch (error) {
     setError( error.response?.data || error.message)
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleSignIn}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "360px",
          border: `1px solid ${borderColor}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "12px",
            fontWeight: 700,
            fontSize: "19px",
            color: primaryColor,
          }}
        >
          Welcome Back
        </h2>

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        {/* PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={handleChange}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Link
            to="/forgot-password"
            style={{
              fontSize: "12px",
              color: primaryColor,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* SIGNIN BUTTON */}
        <button
          type="submit"
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
          style={{
            width: "100%",
            marginTop: "5px",
            backgroundColor: hoverButton ? hoverColor : primaryColor,
            color: "#fff",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.2s",
            boxShadow: hoverButton ? `0 4px 10px rgba(0,0,0,0.1)` : "none",
          }}
        >
          Sign In
        </button>
          

        {/* OR DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", margin: "14px 0" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: borderColor }} />
          <span style={{ margin: "0 6px", fontSize: "12px", color: "#777" }}>
            OR
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: borderColor }} />
        </div>

        {/* GOOGLE SIGNIN */}
        <button
          type="button"
          onMouseEnter={() => setHoverGoogle(true)}
          onMouseLeave={() => setHoverGoogle(false)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: `1px solid ${borderColor}`,
            backgroundColor: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.2s",
            boxShadow: hoverGoogle ? `0 4px 10px rgba(0,0,0,0.1)` : "none",
            fontWeight: 500,
            fontSize: "13px",
          }}
          onClick={handleGoogle
            
          }
        >
          <FcGoogle size={18} />
          Sign in with Google
        </button>

        {/* SIGNUP LINK */}
        <p style={{ marginTop: "12px", textAlign: "center", fontSize: "12px" }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: primaryColor,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: `1px solid ${borderColor}`,
  outline: "none",
  boxSizing: "border-box",
  fontSize: "13px",
  transition: "all 0.2s",
};

export default Signin;
