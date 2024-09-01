import  React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

function createData(name, calories, fat) {
  return { name, calories, fat };
}



export function TableSettingManager({settings, updateTable}) {
  
  const [meal, setMeal] = useState();
  useEffect(() => {
    settings &&   setMeal({
      p_b_adults:settings?.p_b_adults, 
      p_b_bar:settings?.p_b_bar, 
      p_b_children:settings?.p_b_children, 
      p_p_adults:settings?.p_p_adults, 
      p_p_bar:settings?.p_p_bar, 
      p_p_children:settings?.p_p_children, 
      })
}, [updateTable,settings])

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  }
  const rows = [
    createData( 'מנות מבוגר',
    <TextField type='number' label="" variant="filled" name='p_p_adults' value={meal?.p_p_adults ?meal.p_p_adults : 0 } onChange={handleInputChange} />,
    <TextField type='number' label="" variant="filled" name='p_b_adults' value={meal?.p_b_adults?meal.p_b_adults : 0} onChange={handleInputChange} />),
    createData('מנות ילדים',
    <TextField type='number' label="" variant="filled" name='p_p_children' value={meal?.p_p_children?meal.p_p_children : 0} onChange={handleInputChange} />,
    <TextField type='number' label="" variant="filled" name='p_b_children' value={meal?.p_b_children?meal.p_b_children : 0} onChange={handleInputChange} />),
    createData('מנות בר',
    <TextField type='number' label="" variant="filled" name='p_p_bar' value={meal?.p_p_bar?meal.p_p_bar : 0} onChange={handleInputChange} />,
    <TextField type='number' label="" variant="filled" name='p_b_bar' value={meal?.p_b_bar?meal.p_b_bar : 0} onChange={handleInputChange} />),
  ];

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>meal</TableCell>
            <TableCell>פרמיום</TableCell>
            <TableCell>רגיל</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">   {row.name}  </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}