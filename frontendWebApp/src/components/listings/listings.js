import React, { useEffect } from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DayJS from 'react-dayjs';
import '../../index.css'

const baseURL = "http://192.168.200.76:8000/api/answer/getAnswers";

const columns = [
    { id: 'datetime', label: 'Date & Time'},
    { id: 'selectedanswer', label: 'Selected Answer' },
    {
      id: 'descriptions',
      label: 'Descriptions',
      whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis"
    }
  ];

const Listings = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [alllisings, setAlllistings] = React.useState(null);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
      axios.get(baseURL).then((response) => {
        setAlllistings(response.data.data);
      }).catch((err) => {
          console.log('Error ==>', err)
      });
    },[]);

    return (
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <h3>Listings Data</h3>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth,fontWeight: 600,nowrap:true}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {alllisings?alllisings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell ><DayJS format="MM-DD-YYYY HH:MM A" date={row.createdAt}/></TableCell>
                      <TableCell >{row.selectedAnswer}</TableCell>
                      <TableCell >
                                {
                                row.free_text.length > 10?
                                <div style={{ display: "block",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
                                  {row.free_text.trimLeft().slice(0,7).concat("...")}
                                </div>
                                :
                                    row.free_text
                              }

                      </TableCell>
                    </TableRow>
                  );
                }):''}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2,5, 15,25, 100]}
          component="div"
          count={alllisings?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default Listings
