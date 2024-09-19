import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columnsOrsers = [
  { id: "id_order", label: " ID  " },
  { id: "hebrew_date", label: " תאריך אירוע עברי " },
  { id: "date", label: " תאריך לועזי " },
  { id: "nameC", label: " משפחה " },
  { id: "phoneC", label: " טלפון " },
  { id: "emailC", label: " אימייל " },
  { id: "nameK", label: " משפחה " },
  { id: "phoneK", label: " טלפון " },
  { id: "emailK", label: " אימייל " },
  { id: "num_guests", label: " כמות מוזמנים " },
  { id: "num_m_adults", label: " מנות מבוגר " },
  { id: "num_m_children", label: " מנות ילדים  " },
  { id: "num_m_bar", label: " מנות בר  " },
  { id: "type", label: " רמת מנות " },
  { id: "total_payment", label: ' סה"כ לתשלום ' },
];
const columnsInvoices = [
  { id: "id_order", label: " ID  " },
  { id: "name", label: " שם  " },
  { id: "phone", label: " טלפון " },
  { id: "email", label: " איימיל " },
  { id: "payment", label: " תשלום " },
  { id: "date", label: " תאריך תשלום " },
  { id: "hebrew_date", label: " תאריך עברי " },
];
const columnsSum = [
  { id: "date", label: " תאריך חודשי " },
  { id: "sum_orders", label: ' סה"כ הזמנות ' },
  { id: "sum_total_payments", label: ' סה"כ הכנסות מההזמנות ' },
];
const dataHead = (data) => {
  if (data === null) {
    return null;
  } else if (data[0].type) {
    return (
      <>
        <TableRow key={"Rהזמנות"}>
          <TableCell align="center" colSpan={10} key={"הזמנותC"}>
            הזמנות
          </TableCell>
        </TableRow>
        <TableRow key={"צדדים"}>
          <TableCell align="center" colSpan={6} key={"צד-חתן"}>
            צד חתן
          </TableCell>
          <TableCell align="left" colSpan={0} key={"צד-כלה"}>
            צד כלה
          </TableCell>
        </TableRow>
      </>
    );
  } else if (data[0].id_invoice) {
    return (
      <>
        <TableRow key={122}>
          <TableCell align="center" colSpan={6} key={22}>
            חשבוניות
          </TableCell>
        </TableRow>
        <TableRow key={12}>
          <TableCell align="center" colSpan={3} key={23}>
            פרטי משלם
          </TableCell>
        </TableRow>
      </>
    );
  } else if (data[0].sum_orders) {
    return (
      <TableRow key={"122122"}>
        <TableCell align="center" colSpan={6} key={"22122"}>
          סיכום חודשי
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow key={"12122122"}>
        <TableCell align="center" colSpan={3} key={"23122"}>
          אין כותרת
        </TableCell>
      </TableRow>
    );
  }
};
const dataColumns = (data) => {
  if (data === null) {
    return null;
  } else if (data[0].type) {
    return columnsOrsers;
  } else if (data[0].id_invoice) {
    return columnsInvoices;
  } else if (data[0].sum_orders) {
    return columnsSum;
  } else {
    return null;
  }
};

export function Orders({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let rows = data;
  let columns = dataColumns(data);
  let head = dataHead(data);
  return (
    <>
      {console.log(data)}
      {columns ? (
        <Paper
          sx={{
            width: "70%",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            px: 4,
            py: 6,
          }}
        >
          <TableContainer sx={{ maxHeight: 1040 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                {head ? head : null}
                <TableRow key={"131313"}>
                  {columns?.map((column, i) => (
                    <TableCell key={column.id + i} style={{ top: 57 }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {typeof rows === "object" ? (
                  rows
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row, i) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={
                            row.id_order
                              ? row.id_order
                              : row.id_invoices
                              ? row.id_invoices
                              : i
                          }
                        >
                          {columns.map((column, i) => {
                            const value =
                              column.id === "id_order" ? (
                                <button
                                  onClick={() => {
                                    console.log(row[column.id]);
                                  }}
                                >
                                  {row[column.id]}
                                </button>
                              ) : (
                                row[column.id]
                              );
                            return (
                              <TableCell key={column.id}>{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell key={"11111111111"} sx={{ textAlign: "center" }}>
                      אין נתונים זמינים
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 100]}
          />
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "70%",
            alignItems: "center",
            background: "white",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            px: 4,
            py: 6,
          }}
        >
          <h1> אין נתונים זמינים</h1>
        </Paper>
      )}
    </>
  );
}
