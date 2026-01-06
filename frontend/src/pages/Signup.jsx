import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const primaryColor = "#2ECC71";
const hoverColor = "#27AE60";
const bgColor = "#fff9f6";
const borderColor = "#DDEEE3";

const Signup = () => {
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverGoogle, setHoverGoogle] = useState(false);
//   const[name,setName] = useState("")
//    const[password,setPassword] = useState("")
//     const[email,setEmail] = useState("")
//      const[mobile,setMobile] = useState("")

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Payload:", { ...form, role });
  };

  const RoleCard = ({ value, label, icon }) => {
    const [hover, setHover] = useState(false);
    const isSelected = role === value;

    return (
      <div
        onClick={() => setRole(value)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          border: `2px solid ${isSelected ? primaryColor : borderColor}`,
          backgroundColor: isSelected ? bgColor : "#fff",
          padding: "10px",
          borderRadius: "12px",
          cursor: "pointer",
          flex: 1,
          textAlign: "center",
          transition: "all 0.2s",
          transform: hover ? "scale(1.05)" : "scale(1)",
          boxShadow: hover ? `0 4px 10px rgba(0,0,0,0.1)` : "none",
        }}
      >
        <div style={{ fontSize: "22px" }}>{icon}</div>
        <p style={{ marginTop: "4px", fontWeight: 600, fontSize: "13px" }}>{label}</p>
      </div>
    );
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
        onSubmit={handleSubmit}
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
          Create Account
        </h2>

        {/* ROLE SELECTION */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
          <RoleCard value="customer" label="Customer" icon="🛒" />
          <RoleCard value="admin" label="Admin" icon="🏪" />
          <RoleCard value="rider" label="Rider" icon="🚴" />
        </div>

        {/* FORM INPUTS */}
        <input name="name" placeholder="Full Name" required onChange={handleChange} style={inputStyle} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} style={inputStyle} />
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
        <input
          name="mobile"
          type="tel"
          placeholder="Mobile Number"
          required
          maxLength={10}
          pattern="[0-9]{10}"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* SIGNUP BUTTON */}
        <button
          type="submit"
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
          style={{
            width: "100%",
            marginTop: "10px",
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
          Sign Up
        </button>

        {/* OR DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", margin: "14px 0" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: borderColor }} />
          <span style={{ margin: "0 6px", fontSize: "12px", color: "#777" }}>OR</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: borderColor }} />
        </div>

        {/* GOOGLE SIGNUP */}
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
          onClick={() => (window.location.href = "http://localhost:8080/auth/google")}
        >
          <FcGoogle size={18} />
          Sign up with Google
        </button>

        {/* LOGIN LINK */}
        <p style={{ marginTop: "12px", textAlign: "center", fontSize: "12px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: primaryColor, fontWeight: 600, textDecoration: "none" }}>
            Login
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

export default Signup;
