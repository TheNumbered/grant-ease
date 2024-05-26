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
    invalidateKeys: ["manager/applications", "manager/funding-opportunities", "manager/overview-data", "manager/balance","manager/approved-applicants"],
  });

  const { mutate: rejectApplication } = updateMutation({
    resource: "manager/reject-application",
    invalidateKeys: ["manager/applications", "manager/funding-opportunities", "manager/overview-data", "manager/balance"],
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
    setSelectedApplication(null);
  };

  const hasDetails = (item)=> {
    const additionalFields = JSON.parse(item.additional_fields) ?? [];
    return item?.attachments?.length || additionalFields?.length;
  }


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
                <TableCell>Full Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item["full_name"]}</TableCell>
                  <TableCell>
                    {hasDetails(item) ? (
                      <Button
                        variant="contained"
                        onClick={() => setSelectedApplication(item)}
                        color="secondary"
                      >
                        View Details
                      </Button>
                    ):
                    <>
                    <Button variant="contained" color="error" onClick={() => handleStatusChange(item.id, "rejected")} style={{
                      marginRight: "10px"
                    }}>
                      Reject
                    </Button>

                    <Button variant="contained" color="success" onClick={() => handleStatusChange(item.id, "approved")}>
                      Approve
                    </Button>
                    </>
                    }
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
