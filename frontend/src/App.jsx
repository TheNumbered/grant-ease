/* v8 ignore start */
import { UserProfile, useAuth } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { CenteredLayout, MainLayout } from "./layouts";

import { DashboardPage } from "./pages/dashboard";
import CreateFundingOpportunity from "./pages/dashboard/fund-manager/create-funding";
import { UserApplications } from "./pages/dashboard/user/user-applications";
import { ErrorPage } from "./pages/error-page";
import FundingPage from "./pages/funding-page/funding";
import { SignInPage } from "./pages/sign-in/sign-in";
import { SignUpPage } from "./pages/sign-up/sign-up";

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
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/onboarding" element={<UserProfile />} />
            <Route path="/applications" element={<UserApplications />} />
            <Route path="/home" element={<FundingPage />} />
            <Route
              path="/create-funding"
              element={<CreateFundingOpportunity />}
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
/* v8 ignore stop */