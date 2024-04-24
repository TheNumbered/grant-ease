import { UserButton, UserProfile, useAuth } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CenteredLayout } from "./layouts";
import Dashboard from "./pages/admin-dashboard/Dashboard";
import { SignInPage } from "./pages/sign-in/sign-in";
import { SignUpPage } from "./pages/sign-up/sign-up";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <CenteredLayout extras={{ "data-testid": "loading-page" }}><CircularProgress /></CenteredLayout>
  }

  return (
    <BrowserRouter>
      <Routes>
        {isSignedIn && (
          <Route element={<Outlet />}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/button" element={<UserButton />} />
            <Route path="/onboarding" element={<UserProfile />} />
          </Route>
        )}
        {!isSignedIn && (
          <Route element={<Outlet />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        )}

        <Route path="/" element={isSignedIn ? <Navigate to={"/dashboard"} /> : <Navigate to={"/sign-in"} />} />
        <Route path="*" element={<CenteredLayout>404 Not Found</CenteredLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
