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
import {
  createMutation as updateManyMutation
} from "../../../dataprovider";
import { useGlobal } from "../../../layouts/global-provider";

export const ApplicantDetails = () => {
  const location = useLocation();
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

  const { mutate: updateIds, data: returned_message } = updateManyMutation({
    resource: "manager/update-applications",
    invalidateKeys: ["manager/applications"],
  });

  const { mutate: updateBalance, data: returned_data } = updateManyMutation({
    resource: "manager/deduct-balance",
    invalidateKeys: ["manager/balance"],
  });

  const handleStatusChange = (status) => {
    const applicationID = location.state.application.id;
    const fundId = location.state.application.fund_id;

    const newStatus = status === "approve" ? "approved" : "rejected";
    if (newStatus === "approved") {
      const target = amount.find((item) => item.id === fundId);
      const target_amount = target.amount;
      updateBalance({
        amount: target_amount,
      });
    }

    if (returned_data?.message === "Balance deducted successfully") {
      updateIds({ ids: [applicationID], newStatus });
    } else {
      showAlert("Insufficient balance");
    }

    if (returned_message?.message === "Status updated successfully") {
      showAlert("Status updated successfully");
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
            onClick={() => handleStatusChange("reject")}
            style={{ marginRight: "2rem" }}
          >
            Reject Application
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleStatusChange("approve")}
          >
            Approve Application
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
