const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { checkDBConnection } = require("../database/dbConnection");
const cors = require("cors");
const clientRouter = require("./routers/client");
const managerRouter = require("./routers/manager/authentication");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Booking Halls API",
      version: "1.0.0",
      description: "API information",
    },
    servers: [{ url: "http://localhost:3335" }],
  },
  apis: ["./routers/**/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(
  `See the entire API at swagger-ui => ${swaggerDocs.servers[0].url}/api-docs`
);

app.use(cors());
app.use(express.json());
/**
 * @swagger
 * tags:
 *   - name: Client
 *     description: API for client
 *   - name: Manager
 *     description: API for manager
 */
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
