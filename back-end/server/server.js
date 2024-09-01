const express = require("express");
const app = express();
const { checkDBConnection } = require("../database/dbConnection");
const cors = require("cors");
const clientRouter = require("./routers/client");
const managerRouter = require("./routers/manager/authentication");
app.use(cors());
app.use(express.json());

app.use("/api/managers/", managerRouter);
app.use("/api/", clientRouter);
app.use("/*", (req, res) => res.send("not found"));

const connection = checkDBConnection();
if (connection) {
  const port = process.env.PORT || 3335;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
} else {
  console.log("Error al conectar a la base de datos");
}
