// src/app/layout.tsx
import "./globals.css";
import React, { ReactNode } from "react";
import Sidebar from "../components/SidebarMenu"; // Make sure path is correct

export const metadata = {
  title: "My Task Manager",
  description: "Manage your tasks effectively",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head></head>
      <body className="flex ">
        <Sidebar />
        <main className="">
          <section className="max-h-screen flex justify-center items-center ">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
};

export default Layout;