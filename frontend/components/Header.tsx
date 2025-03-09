import React from "react";
import { useRouter } from "next/router";
const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="bg-[#007AFF] text-white p-4 flex justify-center items-center shadow-lg">
      <nav className="hidden xl:flex space-x-8 rounded-full w-[600px] items-center justify-center bg-white text-[#007AFF] font-bold p-2 shadow-lg">
        <a href="/dashboard" className="hover:text-[#0060C9]">
          Dashboard
        </a>
        <a href="/tasks" className="hover:text-[#0060C9]">
          Tasks
        </a>
        <a href="/teams" className="hover:text-[#0060C9]">
          Teams
        </a>
        <a href="/about" className="hover:text-[#0060C9]">
          About
        </a>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
          className="text-[#FF2D55] bg-transparent"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
