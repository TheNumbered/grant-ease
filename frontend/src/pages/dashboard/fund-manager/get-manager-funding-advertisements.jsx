import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { getQuery } from "../../../dataprovider";
import ErrorPage from "../../error-page";
import { LoadingPage } from "../../loading-page";
import ManageApplications from "./applications";

export const ManagerFundingAdvertisements = () => {
  const { data, isError, isLoading } = getQuery("manager/funding-opportunities");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [paperOpen, setPaperOpen] = useState(false);

  const handleButtonClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setPaperOpen(true);
  };

  const handleClosePaper = () => {
    setPaperOpen(false);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <h2>My Funding Advertisements</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {opportunity.title}
                  {opportunity.numApplicants > 0 && (
                    <Button
                    variant="contained"
                    onClick={() => handleButtonClick(opportunity)}
                  >
                    Applicants
                  </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {paperOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
            zIndex: "99", // Ensure it's below the paper modal
            pointerEvents: "none", // Allow pointer events to pass through
          }}
        ></div>
      )}

      {/* Display applicants modal */}
      {paperOpen && (
        <Box
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            zIndex: "100",
            backgroundColor: "rgb(214, 189, 156)",
          }}
        >
          <ManageApplications fundId={selectedOpportunity.id} />
          <Button onClick={handleClosePaper}>Close</Button>
        </Box>
      )}
    </div>
  );
};
