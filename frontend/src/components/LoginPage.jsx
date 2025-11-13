import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUserRole }) {
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000/api/auth";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); 

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
     localStorage.setItem("userInfo", JSON.stringify(data.user)); 
        setUserRole(data.user.role);
        navigate("/home");
      } else {
        setMessage(`❌ ${data.message || "Login failed."}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Server not reachable");
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); 

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
       
        setMessage(`✅ ${data.message}. Please sign in.`);
        setIsLogin(true);
     
        setName('');
        setEmail('');
        setPassword('');
        setRole('user');
      } else {
        setMessage(`❌ ${data.message || "Signup failed."}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("⚠️ Server not reachable");
    }
  };

 
  const inputStyle = "w-full px-3 py-2 rounded-lg border border-[#d1d9e6] mb-4 focus:outline-none focus:border-[#4a90e2] focus:shadow-[0_0_5px_rgba(74,144,226,0.3)] transition duration-300";
  const buttonStyle = "w-full py-2 bg-[#4a90e2] text-white text-lg font-semibold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#357ab8] mt-2";

  return (
    <div className="min-h-screen flex justify-center items-center font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] bg-gradient-to-br from-[#e3eeff] to-[#f8faff] p-4">
      <form 
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center" 
        onSubmit={isLogin ? handleLogin : handleSignup}
      >
        <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Product Store</h2>
        <p className="text-[#7f8c8d] mb-6">{isLogin ? "Sign in to your account" : "Create a new account"}</p>

        {!isLogin && (
            <>
                <label className="block text-left font-medium mb-1 text-[#2c3e50]">Name</label>
                <input
                    className={inputStyle}
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label className="block text-left font-medium mb-1 text-[#2c3e50]">Role</label>
                <select
                    className={inputStyle + " appearance-none cursor-pointer"}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User (Normal Client)</option>
                    <option value="admin">Admin (Product Manager)</option>
                </select>
            </>
        )}
        
        <label className="block text-left font-medium mb-1 text-[#2c3e50]">{isLogin ? "Email" : "Email *"}</label>
        <input
          className={inputStyle}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-left font-medium mb-1 text-[#2c3e50]">{isLogin ? "Password" : "Password *"}</label>
        <input
          className={inputStyle + (isLogin ? " mb-6" : "")} 
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={buttonStyle}>
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        {message && <p className="mt-4 font-bold text-[#2c3e50]">{message}</p>}

        
        <p className="mt-5 text-sm text-[#7f8c8d]">
            {isLogin ? "New to the page?" : "Already have an account?"}
            <button 
                type="button" 
                className="text-blue-600 font-semibold ml-1 hover:underline"
                onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                    setName('');
                    setEmail('');
                    setPassword('');
                    setRole('user'); 
                }}
            >
                {isLogin ? "Create your account" : "Sign In here"}
            </button>
        </p>
        
     
      </form>
    </div>
  );
}