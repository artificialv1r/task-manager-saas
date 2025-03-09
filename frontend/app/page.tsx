"use client";
import React from "react";
import Link from "next/link";
import "./globals.css";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex justify-center items-center flex-grow">
        <div className="bg-white text-black text-center rounded-lg shadow-lg flex items-center justify-center min-h-[400px] max-w-[300px] p-4">
          <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-3xl font-extrabold ">
              Welcome to My Task Manager SaaS Project
            </h1>
            <p>
            In order to test the application, I would kindly ask you to first register your account and then log in.
            </p>
            <Link href="/auth/login">
              <button className="bg-[#007AFF] text-white font-bold shadow-md rounded-md p-2 hover:bg-[#0060C9] w-[200px]">
                Login
              </button>
            </Link>
            <Link href="/auth/register">
            <button className="bg-[#007AFF] text-white font-bold shadow-md rounded-md p-2 hover:bg-[#0060C9] w-[200px]">
              Register
            </button>
            </Link>
            <h2 className="text-lg font-bold">Developed by Stefan</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
