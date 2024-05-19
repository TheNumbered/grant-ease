import PrimarySearchAppBar from "../components/app-bar";
import { NotificationsViewer } from "../components/notifications";
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
  return (
    <GlobalProvider>
      <Layout>{children}</Layout>
    </GlobalProvider>
  );
};