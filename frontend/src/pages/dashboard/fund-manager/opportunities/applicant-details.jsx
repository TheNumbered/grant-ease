import { useGlobal } from "@/layouts/global-provider";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMutation } from "../../../../dataprovider";

export const ApplicantDetails = () => {
  const location = useLocation();
  const applicationId = location.state.application.id;
  const attachmentData = location.state.application.attachments;
  const additionalFields = JSON.parse(location.state.application.additional_fields) ?? [];
  const { showAlert } = useGlobal();
  
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
    const pathParts = url.split(/[/\\]/); // Split by both forward and backward slashes
    const filePart = pathParts[pathParts.length - 1]; // Get the last part which contains the file name with timestamp
    const nameParts = filePart.split("-");
    return nameParts.slice(0, nameParts.length - 1).join("-");
  };

  const {mutate: approveApplication, data: approve_result } = updateMutation({
    resource : "manager/approve-application",
    invalidateKeys : ["manager/applications", "manager/funding-opportunities"]
  })

  const {mutate: rejectApplication, data: reject_result } = updateMutation({
    resource : "manager/reject-application",
    invalidateKeys : ["manager/applications", "manager/funding-opportunities"]
  })

  const handleStatusChange = (status) => {
    if (status === "approved") {
      approveApplication({id: applicationId, newStatus: {status}})
    } else {
      rejectApplication({id: applicationId, newStatus: {status}})
    }
  
    if (approve_result?.message || reject_result?.message) {
      showAlert(approve_result?.message || reject_result?.message)
    }
    if(approve_result?.error || reject_result?.error){
      showAlert(approve_result?.error || reject_result?.error)
    }
  };

  const navigate = useNavigate();

  return (
    <Container>
      <section
        className="breadcrum"
        style={{ padding: "2rem 4rem", paddingBottom: "0rem" }}
      >
        <a
          className="button breadcrum"
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          {"<"} Go Back{"  "}
        </a>
      </section>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Applicant Details
        </Typography>
        <Grid container spacing={2}>
          {additionalFields?.map((field, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{field.label}</Typography>
                  <Typography variant="body1">{field.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} mt={2}>
          {attachmentData?.map((attachmentUrl, index) => (
            <Grid item xs={12} key={index}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleDownload(
                    import.meta.env.VITE_API_URL + "/" + attachmentUrl
                  )
                }
              >
                View {extractFileName(attachmentUrl)}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center" width="100%">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleStatusChange("rejected")}
            style={{ marginRight: "2rem" }}
          >
            Reject Application
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleStatusChange("approved")}
          >
            Approve Application
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
