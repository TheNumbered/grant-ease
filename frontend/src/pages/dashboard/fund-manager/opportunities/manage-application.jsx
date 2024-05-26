import { createMutation, getByIdQuery, updateMutation } from "@/dataprovider";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { ApplicationDetailsModal } from "./applicant-details";


export function ManageApplication({ fundId }) {
  const { data: result, isLoading, isError } = getByIdQuery("manager/applications", fundId);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { mutate: approveApplication } = updateMutation({
    resource: "manager/approve-application",
    invalidateKeys: ["manager/applications", "manager/funding-opportunities"],
  });

  const { mutate: rejectApplication } = updateMutation({
    resource: "manager/reject-application",
    invalidateKeys: ["manager/applications", "manager/funding-opportunities"],
  });

  const { mutate: notify } = createMutation({resource: "notify"});

  const handleStatusChange = (applicationId, status) => {
    if (status === "approved") {
      approveApplication({ id: applicationId, newStatus: { status } });
      notify({type: "approved application", application_id: applicationId});
    } else {
      rejectApplication({ id: applicationId, newStatus: { status } });
      notify({type: "rejected application", application_id: applicationId});
    }
  };

  let data = result ?? [];

  return (
    <>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error loading applications</Alert>}
      {!isLoading && !isError && (
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item["status"]}</TableCell>
                  <TableCell>{item["full_name"]}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setSelectedApplication(item)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      {selectedApplication && (
        <ApplicationDetailsModal
          open={!!selectedApplication}
          onClose={() => setSelectedApplication(null)}
          application={selectedApplication}
          onApprove={(id) => handleStatusChange(id, "approved")}
          onReject={(id) => handleStatusChange(id, "rejected")}
        />
      )}
    </>
  );
}
