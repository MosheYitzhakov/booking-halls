import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

function createData(name, calories, fat, carbs, sum) {
  return { name, calories, fat, carbs, sum };
}


export default function BasicTable({ hall, typeO, dataOrder }) {
  const [meal, setMeal] = useState();
  useEffect(() => {
    if (typeof dataOrder?.order?.num_m_adults !== 'undefined') {
      setMeal({
        adults: dataOrder.order.num_m_adults,
        children: dataOrder.order.num_m_children,
        bar:dataOrder.order.num_m_bar ,
      })
    } else{
      setMeal({
        adults:'',
        children: '',
        bar: '',
      })
    }

  }, [dataOrder])
  const typeB = typeO === 'b';
  const hallPreic = typeB  ? { adults: hall?.p_b_adults, children: hall?.p_b_children, bar: hall?.p_b_bar } :
    { adults: hall?.p_p_adults, children: hall?.p_p_children, bar: hall?.p_p_bar }
  const sum = 
 meal ? {
    adults: hallPreic.adults * meal.adults,
    children: hallPreic.children * meal.children,
    bar: hallPreic.bar * meal.bar
  } :{
    adults: '',
    children: '',
    bar:''
  }


  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  }
  const rows = [
    createData('מנות מבוגר',
      <TextField type='number' label="" variant="filled" name='adults' value={meal?.adults ? meal.adults : ''} onChange={handleInputChange} />
      , hallPreic.adults,
      sum?.adults),

    createData('מנות ילדים',
      <TextField type='number' label="" variant="filled" name='children' value={ meal?.children?  meal.children:''} onChange={handleInputChange} />
      , hallPreic.children,
      sum?.children),
    createData('מנות בר',
      <TextField type='number' label="" variant="filled" name='bar' value={ meal?.bar? meal.bar:''} onChange={handleInputChange} />
      , hallPreic.bar
      , sum?.bar),
    createData('מחיר בסיס לאולם',

      <TextField
        variant="standard"
        value={hall?.base_price}
        InputProps={{
          readOnly: true,
        }}
        name='paymentI'>
      </TextField>),
    createData(' סה"כ לתשלום ',
      <TextField
        variant="standard"
        // sx={{textAlign:"center"}}
        value={
          sum?.adults +
          sum?.children +
          sum?.bar +
          hall?.base_price}
        InputProps={{
          readOnly: true,
        }}
        name='total_paymentO'>
      </TextField>),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ></TableCell>
            <TableCell align="center">מספר מנות</TableCell>
            <TableCell align="center">מחיר מנה</TableCell>
            <TableCell align="center">סה"כ</TableCell>
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
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.sum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 style={{color: (Number(meal?.children) + Number(meal?.adults)) >= hall?.min_meals? "green" :"red"}}> מינימום מנות מבוגר + וילדים: {hall?.min_meals} </h2>
    </TableContainer>
  );
}