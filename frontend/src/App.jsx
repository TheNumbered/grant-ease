import { UserButton, UserProfile, useAuth } from "@clerk/clerk-react";
import { CircularProgress, Typography } from "@mui/material";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { CenteredLayout, MainLayout } from "./layouts";

import { getQuery } from "./dataprovider";
import RoleChangeRequest from "./pages/dashboard/admin/role-change-request";
import { Dashboard } from "./pages/dashboard/dashboard-router";
import { ApplicantDetails } from "./pages/dashboard/fund-manager/applicant-details";
import CreateFundingOpportunity from "./pages/dashboard/fund-manager/create-funding";
import ErrorPage from "./pages/error-page";
import FundingPage from "./pages/funding-page/funding";
import { SignInPage } from "./pages/sign-in/sign-in";
import { SignUpPage } from "./pages/sign-up/sign-up";
import { UserApplications } from "./pages/user-applications/applications";

function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const { data: userMeta, isError, isLoading } = getQuery('user/meta');

  if(userMeta?.is_banned){
    return (
      <CenteredLayout extras={{ "data-testid": "banned-page" }}>
        <Typography variant="h1" gutterBottom>You are banned</Typography>
      </CenteredLayout>
    );
  }
  
  if (!isLoaded ) {
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
            <Route path="/home" element={<FundingPage />} />
            <Route
              path="/create-funding"
              element={<CreateFundingOpportunity />}
            />
            <Route path="/applicant-details" element={<ApplicantDetails/>} />
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
