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
  { id: "id_order", label: " ID  ", minWidth: 100 },
  { id: "hebrew_date", label: " תאריך אירוע עברי ", minWidth: 100 },
  { id: "date", label: " תאריך לועזי ", minWidth: 100 },
  { id: "nameC", label: " משפחה ", minWidth: 100 },
  { id: "phoneC", label: " טלפון ", minWidth: 100 },
  { id: "emailC", label: " אימייל ", minWidth: 170 },
  { id: "nameK", label: " משפחה ", minWidth: 100 },
  { id: "phoneK", label: " טלפון ", minWidth: 100 },
  { id: "emailK", label: " אימייל ", minWidth: 100 },
  { id: "num_guests", label: " כמות מוזמנים ", minWidth: 100 },
  { id: "num_m_adults", label: " מנות מבוגר ", minWidth: 100 },
  { id: "num_m_children", label: " מנות ילדים  ", minWidth: 100 },
  { id: "num_m_bar", label: " מנות בר  ", minWidth: 100 },
  { id: "type", label: " רמת מנות ", minWidth: 100 },
  { id: "total_payment", label: ' סה"כ לתשלום ', minWidth: 100 },
];
const columnsInvoices = [
  { id: "id_order", label: " ID  ", minWidth: 100 },
  { id: "name", label: " שם  ", minWidth: 100 },
  { id: "phone", label: " טלפון ", minWidth: 100 },
  { id: "email", label: " איימיל ", minWidth: 100 },
  { id: "payment", label: " תשלום ", minWidth: 100 },
  { id: "date", label: " תאריך תשלום ", minWidth: 170 },
  { id: "hebrew_date", label: " תאריך עברי ", minWidth: 100 },
];
const columnsSum = [
  { id: "date", label: " תאריך חודשי ", minWidth: 100 },
  { id: "sum_orders", label: ' סה"כ הזמנות ', minWidth: 100 },
  { id: "sum_total_payments", label: ' סה"כ הכנסות מההזמנות ', minWidth: 100 },
];
const dataHead = (data) => {
  if (data === null) {
    return null;
  } else if (data[0].type) {
    return (
      <>
        <TableRow key={122}>
          <TableCell align="center" colSpan={10} key={22}>
            הזמנות
          </TableCell>
        </TableRow>
        <TableRow key={12}>
          <TableCell align="center" colSpan={6} key={22}>
            צד חתן
          </TableCell>
          <TableCell align="left" colSpan={0} key={23}>
            צד כלה
          </TableCell>
        </TableRow>{" "}
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
        </TableRow>{" "}
      </>
    );
  } else if (data[0].sum_orders) {
    return (
      <TableRow key={122}>
        <TableCell align="center" colSpan={6} key={22}>
          סיכום חודשי
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow key={12}>
        <TableCell align="center" colSpan={3} key={23}>
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
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                <TableRow key={13}>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
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
                    ?.map((row) => {
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
                              : row.id
                          }
                        >
                          {columns.map((column) => {
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
                    <TableCell key={11111111111} sx={{ textAlign: "center" }}>
                      אין נתונים זמינים
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 20, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
