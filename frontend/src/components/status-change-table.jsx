import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StatusChangeTable = ({
  title,
  data,
  headers,
  handleStatusChange,
}) => {
  const [selected, setSelected] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (event, id) => {
    if (selected === id) {
      setSelected(null); // Deselect if the same item is clicked again
    } else {
      setSelected(id); // Select the new item
      setAttachments(data.find((row) => row.id === id).attachments);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => setDense(event.target.checked);
  const isSelected = (id) => selected === id;

  const navigate = useNavigate();

  const handleReview = (selectedUser, selectedUserAttachments) => {
    console.log(selectedUser);
    console.log(selectedUserAttachments);
    navigate("/applicant-info", {
      state: { pdfUrl: selectedUserAttachments },
    });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          {selected !== null ? (
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flex: "1 1 100%" }}
            >
              1 selected
            </Typography>
          ) : (
            <Typography variant="h6" component="div" sx={{ flex: "1 1 100%" }}>
              {title}
            </Typography>
          )}

          {selected !== null && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleReview(selected, attachments)}
              >
                Review
              </Button>
            </Stack>
          )}
        </Toolbar>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                {headers.map((header, index) => (
                  <TableCell align="left" key={index}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    {headers.map((header, index) => (
                      <TableCell align="left" key={index}>
                        {row[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={headers.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
