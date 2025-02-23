"use client";
import React, { useState } from "react";

interface HeaderProps {
  onLoginSuccess: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);
          onLoginSuccess(); // Pozovite onLoginSuccess kada je prijava uspešna
          setIsModalOpen(false); // Zatvorite modal nakon uspešne prijave
        } else {
          const errorData = await response.json();
          console.error("Login failed:", errorData);
          // Handle login failure
        }
      } else {
        console.error("Unexpected response format:", await response.text());
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-[#196B69] text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
        <h1 className="text-2xl">My Task Manager</h1>
      </div>
      <div className="flex items-center">
        <button
          className="bg-white text-blue-500 px-4 py-2 rounded"
          onClick={openModal}
        >
          Login
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2 p-1 rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2 p-1 rounded w-full"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <button className="mt-2 text-red-500" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
