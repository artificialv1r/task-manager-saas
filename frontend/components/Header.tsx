import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#196B69] text-white p-4 flex justify-evenly items-center">
      <div className="flex items-center">
        {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
        <h1 className="text-2xl">My Task Manager</h1>
      </div>
      <nav className="flex space-x-4 rounded-full w-[400px] items-center justify-center bg-white text-[#196B69] font-bold p-2">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/tasks" className="hover:underline">
          Tasks
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
      </nav>
      <div className="flex gap-4">
        <p>
          <a
            className="p-1 font-bold border-b-2 border-transparent hover:text-black hover:border-black transition-all duration-300"
            href="/auth/login"
          >
            Login
          </a>{" "}
          /{" "}
          <a
            className="p-1 font-bold border-b-2 border-transparent hover:text-black hover:border-black transition-all duration-300"
            href="/auth/register"
          >
            Register
          </a>
        </p>
      </div>
    </header>
  );
};

export default Header;
