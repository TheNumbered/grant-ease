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
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getQuery,
  createMutation as updateManyMutation,
} from "../../../dataprovider";

// Change data to match the table headers
function transformData(data) {
  return data.map((item) => {
    const transformedItem = {};
    Object.keys(item).forEach((key) => {
      if (key === "status") {
        transformedItem["Status"] = item[key];
      } else if (key === "full_name") {
        transformedItem["Full Name"] = item[key];
      } else {
        transformedItem[key] = item[key];
      }
    });
    return transformedItem;
  });
}

export default function ManageApplications({ fundId }) {
  const { data: result, isLoading, isError } = getQuery("manager/applications");
  const { mutate: updateIds } = updateManyMutation({
    resource: "manager/update-applications",
    invalidateKeys: ["manager/applications"],
  });
  const {
    data: amount,
    isLoading: amountIsLoading,
    isError: amountIsError,
  } = getQuery("manager/fund-ad-amount");

  const {
    mutate: updateBalance,
    data: returned_data,
    isLoading: updateBalanceLoading,
  } = updateManyMutation({
    resource: "manager/deduct-balance",
  });

  const handleStatusChange = (selected, status) => {
    const newStatus = status === "approve" ? "approved" : "rejected";
    const target = amount.find((item) => item.id === fundId);
    const target_amount = target.amount * selected.length;
    updateBalance({
      amount: target_amount,
    });

    if (returned_data?.message === "Balance deducted successfully") {
      updateIds({ ids: selected, newStatus });
      console.log("good!");
    } else {
      alert("Insufficient balance");
    }
  };

  const nagivate = useNavigate();

  const handleViewDocument = (selectedId) => {
    
    const documents = result.find((item) => item.id == selectedId).attachments;
    console.log("Selected", selectedId, "Documents", documents )
    nagivate("/applicant-details",{state: {pdfUrl: documents}} )
  }
  let data = result ?? [];
  data = transformData(data);

  function filterByFundId(data, fundId) {
    return data.filter((item) => item.fund_id === fundId);
  }

  data = filterByFundId(data, fundId);

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
                <TableCell>{item["Status"]}</TableCell>
                <TableCell>{item["Full Name"]}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusChange([item.id], "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleStatusChange([item.id], "reject")}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleViewDocument(item.id)}
                    >
                      View Document
                    </Button>

                    
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Card>
      )}
    </>
  );
}
