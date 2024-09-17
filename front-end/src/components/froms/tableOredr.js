import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { Loading } from "../loading";
import { ClientSideContext } from "../../hooks/useContext";
import { isMinMeals } from "../../functions/isMinMeals";

export default function BasicTable({ hall }) {
  const {
    order: [order],
  } = useContext(ClientSideContext);
  const [meal, setMeal] = useState({
    adults: null,
    children: null,
    bar: null,
  });
  useEffect(() => {
    if (order.num_m_adults) {
      setMeal({
        adults: order.num_m_adults,
        children: order.num_m_children,
        bar: order.num_m_bar,
      });
    }
  }, [order]);

  if (!hall | !meal) return <Loading />;
  const handleInputChange = ({ target: { name, value } }) => {
    setMeal((prev) => ({ ...prev, [name]: value }));
  };
  const {
    p_b_adults,
    p_b_children,
    p_b_bar,
    p_p_adults,
    p_p_children,
    p_p_bar,
    min_meals,
    base_price,
  } = hall;
  const { adults, children, bar } = meal;

  const hallPrice =
    order.type === "b"
      ? { adults: p_b_adults, children: p_b_children, bar: p_b_bar }
      : { adults: p_p_adults, children: p_p_children, bar: p_p_bar };
  const sum = {
    adults: hallPrice.adults * adults,
    children: hallPrice.children * children,
    bar: hallPrice.bar * bar,
  };
  const rows = [
    createData(
      "מנות מבוגר",
      <TextField
        type="number"
        variant="filled"
        name="adults"
        value={meal.adults ?? ""}
        onChange={handleInputChange}
      />,
      hallPrice.adults,
      sum?.adults
    ),
    createData(
      "מנות ילדים",
      <TextField
        type="number"
        variant="filled"
        name="children"
        value={meal.children ?? ""}
        onChange={handleInputChange}
      />,
      hallPrice.children,
      sum?.children
    ),
    createData(
      "מנות בר",
      <TextField
        type="number"
        variant="filled"
        name="bar"
        value={meal.bar ?? ""}
        onChange={handleInputChange}
      />,
      hallPrice.bar,
      sum?.bar
    ),
    createData(
      "מחיר בסיס לאולם",
      <TextField
        variant="standard"
        value={base_price}
        InputProps={{
          readOnly: true,
        }}
        name="paymentI"
      />
    ),
    createData(
      ' סה"כ לתשלום ',
      <TextField
        variant="standard"
        name="total_paymentO"
        value={sum?.adults + sum?.children + sum?.bar + base_price}
        InputProps={{
          readOnly: true,
        }}
      />
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">מספר מנות</TableCell>
            <TableCell align="center">מחיר מנה</TableCell>
            <TableCell align="center">סה"כ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.numMeals}</TableCell>
              <TableCell align="center">{row.sumPerMeal}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        style={{
          color: isMinMeals(adults, children, min_meals) ? "green" : "red",
        }}
      >
        <h2>
          מינימום מנות <span>(לא כולל מנות בר)</span>: {min_meals}
        </h2>
        <h3>
          {!isMinMeals(adults, children, min_meals) &&
            "חסרים: " +
              (min_meals - (Number(children) + Number(adults))) +
              " מנות"}
        </h3>
      </div>
    </TableContainer>
  );
}
function createData(name, numMeals, sumPerMeal, total) {
  return { name, numMeals, sumPerMeal, total };
}
