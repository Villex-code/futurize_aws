import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { DashboardNavbar } from "../dashboard-navbar";
import { DashboardSidebar } from "../dashboard-sidebar";

import { Airbnb } from "@/icons/airbnb";
import { Loader } from "@/icons/LoadingAnimation";
import { Air } from "@mui/icons-material";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen cursor-pointer bg-blue-200 p-4 rounded-2xl">
      Page is loading
    </div>
  );
}
