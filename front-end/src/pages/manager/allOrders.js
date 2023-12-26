import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'hebrew_date', label: ' תאריך אירוע עברי ', minWidth: 100 },
  { id: 'date', label: ' תאריך לועזי ', minWidth: 100 },
  { id: 'nameC', label: ' משפחה ', minWidth: 100 },
  { id: 'phoneC', label: ' טלפון ', minWidth: 100 },
  { id: 'emailC', label: ' אימייל ', minWidth: 170 },
  { id: 'nameK', label: ' משפחה ', minWidth: 100 },
  { id: 'phoneK', label: ' טלפון ', minWidth: 100 },
  { id: 'emailK', label: ' אימייל ', minWidth: 100, },
  {id: 'num_guests',label: ' כמות מוזמנים ', minWidth: 100, },
  {id: 'num_m_adults',    label: ' מנות מבוגר ',minWidth: 100,},
  { id: 'num_m_children', label: ' מנות ילדים  ', minWidth: 100 },
  { id: 'num_m_bar', label: ' מנות בר  ', minWidth: 100 },
  { id: 'type', label: ' רמת מנות ', minWidth: 100 },
  { id: 'total_payment', label: ' סה"כ לתשלום ', minWidth: 100 },
  
];

// function createData(nameC, phoneC, emailC, nameK, phoneK, emailK,num_guests,num_m_adults,num_m_children,num_m_bar,type,total_payment,hebrew_date,date) {
//   return { nameC, phoneC, emailC, nameK, phoneK, emailK,num_guests,num_m_adults,num_m_children,num_m_bar,type,total_payment,hebrew_date,date };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

export function AllOrders({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const rows = data? data : []
  return (
    <Paper sx={{ width: '80%' }}>
      <TableContainer
       sx={{ maxHeight: 1040  }}
       >
        <Table stickyHeader aria-label="sticky table" sx={{height:500}}>
          <TableHead>
            <TableRow key={12}>
              <TableCell align="center" colSpan={6} key={22}>
                צד חתן
              </TableCell>
              <TableCell align="left" colSpan={0} key={23}>
                צד כלה
              </TableCell>
            </TableRow>
            <TableRow key={13}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  // align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id_order ? row.id_order :row.id_invoices}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 20, 100]}
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