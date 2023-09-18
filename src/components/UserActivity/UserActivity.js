import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const columns = [
  { id: 'User Activity',
  label: 'User Activity',
  minWidth: 170,
  align : 'left',
  format : (value) => value.toLocaleString('en-US')   }
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

function UserActivity(props) {
  const {userId} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [error, setError] = useState(null);


  const getActivity = () => {
    fetch("/users/activity/"+userId, {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("tokenKey")
        }
    })
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            console.log(result);
            setRows(result);
        },
        (error) => {
            console.log(error);
            setIsLoaded(true);
            setError(error);
        }
    )
  }

  React.useEffect(() => { getActivity()}, [] )

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              User Activity
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
                return (
                    <TableRow hover role = "checkbox" tabIndex={-1} key ={row.code}>
                        {row[3] + " "  + row[0] + " your post"}
                    </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default UserActivity;