"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use the App Router version

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Run only on client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/auth/login");
            } else {
                setIsAuthenticated(true);
            }
        }
    }, [router]);

    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
            {/* Dashboard content goes here */}
        </div>
    );
};

export default Dashboard;