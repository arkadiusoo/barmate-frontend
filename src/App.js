import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ShoppingListPage from "./pages/ShoppingListPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(stored);
    } catch (err) {
      console.warn("localStorage unavailable:", err);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route
            path="*"
            element={<Home onLogin={() => setIsLoggedIn(true)} />}
          />
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
