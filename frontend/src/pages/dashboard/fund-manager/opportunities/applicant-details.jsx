import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from "@mui/material";
import React from "react";

export const ApplicationDetailsModal = ({ open, onClose, application, onApprove, onReject }) => {
  if (!application) return null;

  const handleDownload = (attachmentUrl) => {
    const link = document.createElement("a");
    link.href = attachmentUrl;
    link.setAttribute("download", "document.pdf");
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const extractFileName = (url) => {
    const pathParts = url.split(/[/\\]/);
    const filePart = pathParts[pathParts.length - 1];
    const nameParts = filePart.split("-");
    return nameParts.slice(0, nameParts.length - 1).join("-");
  };

  const additionalFields = JSON.parse(application.additional_fields) ?? [];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Applicant Details</DialogTitle>
      <DialogContent
      component={"section"}
      sx={{
        maxHeight: '80vh', // Set a maximum height for the modal
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        overflow: 'auto', // Enable scrolling
        border: '1px solid #ffd661',
      }}
      >
        {additionalFields?.map((field, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <Typography variant="h6" gutterBottom>
              {field.label}
            </Typography>
            <Typography variant="body1">
              {field.value}
            </Typography>
          </div>
        ))}
        {application?.attachments?.map((attachmentUrl, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            onClick={() => handleDownload(import.meta.env.VITE_API_URL + "/" + attachmentUrl)}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            View {extractFileName(attachmentUrl)}
          </Button>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => onReject(application.id)}>
          Reject
        </Button>
        <Button variant="contained" color="success" onClick={() => onApprove(application.id)}>
          Approve
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
