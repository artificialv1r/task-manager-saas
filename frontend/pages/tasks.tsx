"use client";
import React from "react";
import Header from "../components/SidebarMenu";
import Footer from "../components/Footer";
import "../app/globals.css";

const Tasks: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="flex justify-center items-center flex-grow p-12"></section>
      <Footer />
    </div>
  );
};

export default Tasks;
