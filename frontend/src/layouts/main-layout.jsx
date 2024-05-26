import { SignOutButton } from "@clerk/clerk-react";
import { CircularProgress, Typography } from "@mui/material";
import PrimarySearchAppBar from "../components/app-bar";
import { NotificationsViewer } from "../components/notifications";
import { getQuery } from "../dataprovider";
import { CenteredLayout } from "./centered-layout";
import { GlobalProvider, useGlobal } from "./global-provider";
import "./main-styles.css";
const Layout = ({ children }) => {
  const { isNotificationOpen, setIsNotificationOpen } = useGlobal();

  return (
    <>
      <PrimarySearchAppBar />
      <main>
        {isNotificationOpen && (
          <NotificationsViewer onClose={() => setIsNotificationOpen(false)} />
        )}
        {children}
      </main>
    </>
  );
};




export const MainLayout = ({ children }) => {

  const { data: userMeta, isLoading } = getQuery('user/meta');

  if (isLoading) {
    return (
      <CenteredLayout extras={{ "data-testid": "loading-page" }}>
        <CircularProgress />
      </CenteredLayout>
    );
  }

  if(userMeta?.is_banned){
    return (
      <CenteredLayout extras={{ "data-testid": "banned-page" }}>
        <Typography variant="h1" gutterBottom>You are banned</Typography>
        <SignOutButton path="/sign-up" signInUrl="/sign-in" />
      </CenteredLayout>
    );
  }
  
  return (
    <GlobalProvider>
      <Layout>{children}</Layout>
    </GlobalProvider>
  );
};