import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { getQuery } from 'dataprovider';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from '../../loading-page';

export const UserApplications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isError, isLoading } = getQuery('user/applications');
  if (isLoading) {
    return <LoadingPage />
  };
  if (isError) {
    Navigate("/error");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toSentenceCase = str => {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  return (
        <article className='card'>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            Applications
          </Typography>
          {data.length === 0 ? ( // Check if applicationsList is empty
            <Typography variant="body1" align="center">
              You Have Not Applied For Any Funding Yet
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
                      <TableRow key={application.id}>
                        <TableCell>{application.title}</TableCell>
                        <TableCell>{toSentenceCase(application.status)}</TableCell>
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
        </article>
  );
};
