import React, { useState } from 'react';
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


export default function BasicTable({ hall, typeO }) {
  const [meal, setMeal] = useState({
    adults: "",
    children: "",
    bar: "",
  });
  const typeB = typeO === 'b';
  const hallPreic = typeB ? { adults: hall.p_b_adults, children: hall.p_b_children, bar: hall.p_b_bar } :
    { adults: hall.p_p_adults, children: hall.p_p_children, bar: hall.p_p_bar }
  const sum = {
    adults: hallPreic.adults * meal.adults,
    children: hallPreic.children * meal.children,
    bar: hallPreic.bar * meal.bar
  }


  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  }
  const rows = [
    createData('מנות מבוגר',
      <TextField type='number' label="" variant="filled" name='adults' value={meal.adults} onChange={handleInputChange} />
      , hallPreic.adults, 
      sum.adults),

    createData('מנות ילדים',
      <TextField type='number' label="" variant="filled" name='children' value={meal.children} onChange={handleInputChange} />
      , hallPreic.children,
       sum.children),
    createData('מנות בר',
      <TextField type='number' label="" variant="filled" name='bar' value={meal.bar} onChange={handleInputChange} />
      , hallPreic.bar
      , sum.bar),
    createData('מחיר בסיס לאולם',
      hall.down_payment),
    createData(' סה"כ לתשלום ',
      sum.adults +
      sum.children +
      sum.bar +
      hall.down_payment),
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