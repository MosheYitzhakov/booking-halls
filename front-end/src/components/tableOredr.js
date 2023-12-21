import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}


export default function BasicTable({hall, typeO}) {
  console.log(hall);
  console.log(typeO);
  const typeB = typeO === 'b';
  const rows = [
   createData( 'מנות מבוגר',
   <TextField type='number' label="" variant="filled" />
   , typeB? hall.p_b_adults
   : hall.p_p_adults, 24),
    createData('מנות ילדים', 
    <TextField type='number' label="" variant="filled" />
    , typeB? hall.p_b_children
    : hall.p_p_children, 37),
    createData('מנות בר',
    <TextField type='number' label="" variant="filled" />
    , typeB? hall.p_b_bar
    : hall.p_p_bar
    , 2),
    createData('מחיר בסיס לאולם', 
    1500),
    createData(' סה"כ לתשלום ', 
    1500),
  ];
  return (
    <TableContainer component={Paper}>
      {/* <h1>סיכום תשלום</h1> */}
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ></TableCell>
            <TableCell align="center">מספר מנות</TableCell>
            <TableCell align="right">מחיר מנה</TableCell>
            <TableCell align="right">סה"כ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}