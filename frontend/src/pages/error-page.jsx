/* v8 ignore start */
import { CenteredLayout } from "@/layouts";
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <CenteredLayout extras={{ "data-testid": "error-page" }}>
      <Paper elevation={3} style={{ 
        padding: "2rem",
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto",
      }}>
        <Typography variant="h3" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" gutterBottom>
          We apologize for the inconvenience.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/home"
          style={{ marginTop: "1rem" }}
        >
          Go Home
        </Button>
      </Paper>
    </CenteredLayout>
  );
};

/* v8 ignore start */