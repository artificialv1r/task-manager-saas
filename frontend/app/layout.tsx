// src/app/layout.tsx
import "./globals.css"; // Importuj globalne stilove
import React, { ReactNode } from "react";

export const metadata = {
  title: "My Task Manager",
  description: "Manage your tasks effectively",
};

interface LayoutProps {
  children: ReactNode; // Dodaj tip za children
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;
