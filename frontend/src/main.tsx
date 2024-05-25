/* v8 ignore start */
import { ClerkProvider } from "@clerk/clerk-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
//@ts-ignore
import App from "./App";
import theme from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);
/* v8 ignore end */
