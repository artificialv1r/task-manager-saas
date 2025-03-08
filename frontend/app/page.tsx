"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import "./globals.css";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="flex justify-center items-center flex-grow">
        <div className="bg-white text-black text-center rounded-lg shadow-lg flex items-center justify-center min-h-[400px] max-w-[300px] p-4">
          <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-3xl font-extrabold ">
              My Task Manager SaaS Project
            </h1>
            <h2>Developed by Stefan</h2>
            <p>
              You can find more details about the application itself on the
              About page{" "}
            </p>
            <Link href="/about">
              <button className="bg-[#007AFF] text-white font-bold shadow-md rounded-md p-2 hover:bg-[#0060C9] w-[200px]">
                See More!
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
