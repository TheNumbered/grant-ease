import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export const ApplicantDetails = () => {
  const location = useLocation();
  const attachmentData = location.state.pdfUrl;

  const handleDownload = (attachmentUrl) => {
    const link = document.createElement("a");
    link.href = attachmentUrl;
    link.setAttribute("download", "document.pdf");
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        {attachmentData?.map((attachmentUrl, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            onClick={() =>
              handleDownload(import.meta.env.VITE_API_URL + "/" + attachmentUrl)
            }
            style={{ marginBottom: "10px" }}
          >
            View Document {index + 1}
          </Button>
        ))}
      </Box>
    </Container>
  );
};