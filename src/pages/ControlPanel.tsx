"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

const ControlPanel = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="flex-1">
        <Outlet /> {/* This will render the nested admin pages */}
      </div>
    </div>
  );
};

export default ControlPanel;