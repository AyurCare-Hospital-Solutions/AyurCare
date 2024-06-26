import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';

function MaterialsTable({ data, query, deleteMaterial, hadelUpdateModalOpen, setUpdatedMaterial }: { data: any, query: String, deleteMaterial: (p: any) => any, hadelUpdateModalOpen: () => any, setUpdatedMaterial: (p: any) => any }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    // setData(props.data);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const indicationColor = (amount: number, buffer: number) => {
    if (amount == 0) {
      return '#ff7979';
    }
    else if (amount <= buffer + 5) {
      return '#f9ff49db';
    }
    else {
      return '';
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell size="small">ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Re-Order Buffer</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell size="small">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((row: any) => {
                if (query) {
                  return (row.Item.name.startsWith(query));
                }

                else {
                  return row;
                }
              })
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ backgroundColor: indicationColor(row.amount, row.Item.reOrderBuffer), ':hover': { backgroundColor: indicationColor(row.amount, row.Item.reOrderBuffer) } }}>
                    <TableCell size="small">{row.id}</TableCell>
                    <TableCell>{row.Item.name}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.Item.reOrderBuffer}</TableCell>
                    <TableCell>{row.Item.unit}</TableCell>
                    <TableCell size="small">
                      <IconButton
                        color='primary'
                        size='small'
                        onClick={() => {
                          setUpdatedMaterial(row);
                          hadelUpdateModalOpen();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color='secondary'
                        size='small'
                        onClick={() => {
                          deleteMaterial(row)
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }) :
              <TableRow>
                <TableCell rowSpan={2} colSpan={6}>
                  <Box width={"100%"} display={"flex"} flexDirection={"column"} sx={{ alignItems: "center" }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box mx={10} mt={3} display='flex'>
        <Box height='15px' width='15px' mx={1} sx={{ backgroundColor: '#f9ff49db' }}></Box> <Typography>Materials getting out-of-stock</Typography>
      </Box>
      <Box mx={10} my={1} display='flex'>
        <Box height='15px' width='15px' mx={1} sx={{ backgroundColor: '#ff7979' }}></Box> <Typography>Material out-of-stock</Typography>
      </Box>
    </Paper>
  );
}

export default MaterialsTable;
