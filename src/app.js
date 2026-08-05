const express = require("express");
const path = require("path");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

const technicianRoutes = require("./modules/technician/technician.routes");
const companyRoutes = require("./modules/company/company.routes");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();


// Body Parser
app.use(express.json());


// Swagger
app.use(
  "/api-docs",
  express.static(
    path.join(__dirname, "../node_modules/swagger-ui-dist")
  )
);

app.get("/api-docs", (req, res) => {
  res.send(swaggerUi.generateHTML(swaggerSpec));
});

console.log("Swagger loaded");


// Auth Routes
app.use("/api/auth", authRoutes);


// Technician Routes
app.use("/api/technicians", technicianRoutes);


// Company Routes
app.use("/api/companies", companyRoutes);


module.exports = app;