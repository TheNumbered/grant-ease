import { UserButton, UserProfile, useAuth } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { CenteredLayout, MainLayout } from "./layouts";
import { AdminDashboard } from "./pages/dashboard/admin/dashboard";
import RoleChangeRequest from "./pages/dashboard/admin/role-change-request";
import { Dashboard } from "./pages/dashboard/dashboard-router";
import CreateFundingOpportunity from "./pages/dashboard/fund-manager/create-funding";
import ManagerBalance from "./pages/dashboard/fund-manager/get-data";
import { ManagerFundingAdvertisements } from "./pages/dashboard/fund-manager/get-manager-funding-advertisements";
import ErrorPage from "./pages/error-page";
import FundingPage from "./pages/funding-page/funding";
import { SignInPage } from "./pages/sign-in/sign-in";
import { SignUpPage } from "./pages/sign-up/sign-up";
import { UserApplications } from "./pages/user-applications/applications";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <CenteredLayout extras={{ "data-testid": "loading-page" }}>
        <CircularProgress />
      </CenteredLayout>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {isSignedIn && (
          <Route
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/role-change-request"
              element={<RoleChangeRequest />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/button" element={<UserButton />} />
            <Route path="/onboarding" element={<UserProfile />} />
            <Route path="/user-applications" element={<UserApplications />} />
            {/* <Route
              path="/fund-manager-dashboard"
              element={<FundManagerDashboard />}
            /> */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/home" element={<FundingPage />} />
            <Route
              path="/create-funding"
              element={<CreateFundingOpportunity />}
            />
            <Route path="fund" element={<ManagerFundingAdvertisements />} />
            <Route
              path="/fund-manager-dashboard"
              element={<ManagerBalance />}
            />
          </Route>
        )}
        {!isSignedIn && (
          <Route element={<Outlet />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        )}

        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to={"/home"} />
            ) : (
              <Navigate to={"/sign-in"} />
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
