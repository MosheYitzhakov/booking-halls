import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { TableCell, TableRow } from "@mui/material";
import { Err } from "../error";
import { Loading } from "./loading";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "firstName", headerName: "First name" },
  { field: "lastName", headerName: "Last name" },
  {
    field: "age",
    headerName: "Age",
    type: "number",
  },
];
const columnsOrsers = [
  { field: "id_order", headerName: " ID  ", width: 50 },
  { field: "hebrew_date", headerName: " תאריך אירוע עברי ", width: 150 },
  { field: "date", headerName: " תאריך לועזי ", width: 200 },
  { field: "nameC", headerName: " משפחה " },
  { field: "phoneC", headerName: " טלפון " },
  { field: "emailC", headerName: " אימייל " },
  { field: "nameK", headerName: " משפחה " },
  { field: "phoneK", headerName: " טלפון " },
  { field: "emailK", headerName: " אימייל " },
  { field: "num_guests", headerName: " כמות מוזמנים " },
  { field: "num_m_adults", headerName: " מנות מבוגר " },
  { field: "num_m_children", headerName: " מנות ילדים  " },
  { field: "num_m_bar", headerName: " מנות בר  " },
  { field: "type", headerName: " רמת מנות " },
  { field: "total_payment", headerName: ' סה"כ לתשלום ' },
];

const paginationModel = { page: 0, pageSize: 15 };

export default function DataTable({ data }) {
  let num = 2;
  function getRowId() {
    num += 1;
    return num;
  }
  if (!data) return <Loading />;
  return (
    <Paper sx={{ height: "100%", width: "80%" }}>
      {/* <TableRow key={"Rהזמנות"}>
          <TableCell align="center" colSpan={10} key={"הזמנותC"}>
            הזמנות
          </TableCell>
        </TableRow> */}
      <DataGrid
        rows={data}
        columns={columnsOrsers}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[15, 20]}
        sx={{ border: 0 }}
        getRowId={getRowId}
      />
    </Paper>
  );
}
