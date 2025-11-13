


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

const getInitialUserRole = () => {
  try {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      return JSON.parse(storedUserInfo).role;
    }
  } catch (e) {
    console.error("Error parsing user info from storage:", e);
    localStorage.removeItem('userInfo'); 
  }
  return null;
};

function App() {
  const [userRole, setUserRole] = useState(getInitialUserRole);
  

  useEffect(() => {
    if (!userRole) {
        const roleFromStorage = getInitialUserRole();
        if (roleFromStorage) {
            setUserRole(roleFromStorage);
        }
    }
  }, [userRole]); 


  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserRole(null); 
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            userRole ? 
            <Navigate to="/home" replace /> : 
            <LoginPage setUserRole={setUserRole} />
          } 
        />
        
        <Route
          path="/home"
          element={
            userRole ? (
              <HomePage userRole={userRole} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace /> 
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
