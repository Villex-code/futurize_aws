import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthGuard } from "./auth-guard";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Unlock } from "../icons/unlock";
import notSigned from "./notSigned";
import styles from "../styles/Home.module.css";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const { children } = props;
  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        {user ? (
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {children}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div className={`${styles.not_signed} text-center`}>
              You are currently not signed in <br />
              Please login to preview the content
              <Link href="/api/auth/login">
                <div className="mt-5 cursor-pointer bg-orange-200 p-4 rounded-2xl">
                  <Unlock /> Login
                </div>
              </Link>
            </div>
          </Box>
        )}
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </AuthGuard>
  );
};
