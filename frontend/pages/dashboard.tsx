"use client";
import React, { useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import "../app/globals.css";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
        router.push("/auth/login")
    }else{
        setIsAuthenticated(true);
    }
},[]);

    if(!isAuthenticated){
        return <div className="">Lodaing...</div>
    }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="flex justify-center items-center flex-grow">
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
