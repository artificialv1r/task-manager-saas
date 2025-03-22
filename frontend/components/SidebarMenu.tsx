"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (assuming token is stored in localStorage)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert to boolean
  }, []);

  if (!isAuthenticated) return null; // Hide Sidebar if not logged in

  const menuItems = [
    { name: "Board", icon: <ArticleOutlinedIcon sx={{ fontSize: 40 }} />, path: "/board" },
    { name: "Team", icon: <GroupsOutlinedIcon sx={{ fontSize: 40 }} />, path: "/team" },
    { name: "Tasks", icon: <AssignmentOutlinedIcon sx={{ fontSize: 40 }} />, path: "/tasks" },
    { name: "Analytics", icon: <BarChartOutlinedIcon sx={{ fontSize: 40 }} />, path: "/analytics" },
  ];

  return (
    <aside className="bg-[#1E1E1E] text-white flex flex-col w-20 h-[95dvh] justify-between m-4 p-4 rounded-[20px] shadow-lg md:w-[120px]">
      <button
        onClick={() => router.push("/auth/profile")}
        className="flex flex-col items-center space-x-3 p-2 bg-transparent hover:bg-[#2E2E2E] rounded-lg transition"
      >
        <BadgeOutlinedIcon sx={{ fontSize: 40 }} />
      </button>

      <nav className="flex flex-col items-center space-y-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`flex flex-col items-center p-2 rounded-lg hover:bg-[#2E2E2E] transition ${
              pathname === item.path ? "bg-[#0050A0]" : ""
            }`}
          >
            {item.icon}
            <span className="p-1 font-normal text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }}
        className="flex flex-col items-center p-2 text-[#FF2D55] bg-transparent hover:bg-[#2E2E2E] rounded-lg transition"
      >
        <LoginOutlinedIcon sx={{ fontSize: 40 }} />
      </button>
    </aside>
  );
};

export default Sidebar;
