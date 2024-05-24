import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { getQuery, updateMutation } from "dataprovider";
import { useState } from 'react';

export default function ManageUsers() {
  const { data, isLoading, isError } = getQuery("admin/users");
  const userData = data ?? [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Change this as needed
  const {mutate: toggleBan} = updateMutation({
    resource: "admin/toggle-ban",
    invalidateKeys:["admin/users"]
  });
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <Paper sx={{
          padding: "1rem",
          marginBottom: "1rem",
        }}>
        <h2>Manage Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : userData
            ).map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.is_banned ? "primary" : "error"}
                    onClick={() => toggleBan({id: user.id, newValues: {is_banned: user.is_banned==0 ? 1 : 0}})}
                  >
                    {user.is_banned ? "Activate" : "Ban"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      </Paper>
    </>
  );
}
