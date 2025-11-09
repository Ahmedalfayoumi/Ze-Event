"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <MadeWithDyad />
      <Footer />
    </div>
  );
};

export default Layout;