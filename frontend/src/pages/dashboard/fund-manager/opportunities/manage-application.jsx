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
import { getByIdQuery } from "dataprovider";
import React from "react";
import { useNavigate } from "react-router-dom";

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

export function ManageApplication({ fundId }) {
  const { data: result, isLoading, isError } = getByIdQuery("manager/applications", fundId)
  const nagivate = useNavigate();

  const handleViewDocument = (selectedId) => {
    const details = result.find((item) => item.id == selectedId);
    nagivate("/applicant-details", { state: { application: details } });
  };
  let data = result ?? [];
  data = transformData(data);

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
                      color="secondary"
                      onClick={() => handleViewDocument(item.id)}
                    >
                      View Application
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
