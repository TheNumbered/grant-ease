import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getQuery } from '../../dataprovider';
import ErrorPage from '../error-page';
import { LoadingPage } from '../loading-page';

export const UserApplications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isError, isLoading } = getQuery('user/applications');
  if (isLoading) {
    return <LoadingPage/>
  };
  if (isError) {
    return <ErrorPage/>
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const toUpper = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh" // 90% of viewport height
      >
        <Paper elevation={3} style={{ width: '90%', maxWidth: '800px' }}>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            Applications
          </Typography>
          {data.length === 0 ? ( // Check if applicationsList is empty
            <Typography variant="body1" align="center">
              No applications available.
            </Typography>
          ) : (
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name of the Company</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : data
                    ).map(application => (
                      <TableRow key={application.applicant_id}>
                        <TableCell>{application.title}</TableCell>
                        <TableCell>{toUpper(application.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
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
      </Box>
  );
};
