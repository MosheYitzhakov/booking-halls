const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { checkDBConnection } = require("../database/dbConnection");
const cors = require("cors");
const clientRouter = require("./routers/client/client");
const managerRouter = require("./routers/manager/authentication");
const port = process.env.PORT || 3335;
const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Booking Halls API",
      version: "1.0.0",
      description: "API information",
    },
    servers: [{ url }],
  },
  apis: ["./routers/**/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(
  `See the entire API at swagger-ui => ${swaggerDocs.servers[0].url}/api-docs`
);
// /**
//  * @swagger
//  * tags:
//  *   - name: Client
//  *     description: API for client
//  *   - name: Manager
//  *     description: API for manager
//  */

const allowedOrigins = [process.env.RENDER_FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/managers/", managerRouter);
app.use("/api/", clientRouter);
app.get("/", (req, res) => res.send("Welcome to Booking Halls API"));
app.use("/*", (req, res) => res.send("not found"));

const connection = checkDBConnection();
if (connection) {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
} else {
  console.log("Error al conectar a la base de datos");
}
