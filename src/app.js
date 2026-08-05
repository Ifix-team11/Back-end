const express = require("express");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

const technicianRoutes = require("./modules/technician/technician.routes");
const companyRoutes = require("./modules/company/company.routes");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();


// Body Parser
app.use(express.json());


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("Swagger loaded");

// Auth Routes
app.use("/api/auth", authRoutes);


// Technician Routes
app.use("/api/technicians", technicianRoutes);


// Company Routes
app.use("/api/companies", companyRoutes);

module.exports = app;