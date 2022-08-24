import express from "express";
import bodyParser from "body-parser";

import sensorsRoutes from "./routes/sensor.router.js";
import virtualSensor from "./controllers/sensors.controller.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST;

app.use(bodyParser.json());

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Flood Detection API",
//       description:
//         "API for generating virtual sensors, storing sensor count data, and retrieving water depth level",
//       contact: {
//         name: "Breeze Technologies",
//       },
//       servers: ["https://flood-detector.azurewebsites.net"],
//     },
//   },

//   apis: ["routes/*.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/sensors", sensorsRoutes);

virtualSensor();

app.get("/", (req, res) => res.send("Flood Detector Application"));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${DB_HOST}`)
);
