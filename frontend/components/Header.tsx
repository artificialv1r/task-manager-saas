import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#007AFF] text-white p-4 flex justify-center items-center shadow-lg">
      <nav className="flex space-x-8 rounded-full w-[600px] items-center justify-center bg-white text-[#007AFF] font-bold p-2 shadow-lg">
        <a href="/" className="hover:color-[#0060C9]">
          Home
        </a>
        <a href="/tasks" className="hover:color-[#0060C9]">
          Tasks
        </a>
        <a href="/about" className="hover:color-[#0060C9]">
          About
        </a>
        <a href="/auth/login" className="hover:color-[#0060C9]">
          Login
        </a>
        <a href="/auth/register" className="hover:color-[#0060C9]">
          Register
        </a>
      </nav>
    </header>
  );
};

export default Header;
