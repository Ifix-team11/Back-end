const express = require("express");
const { swaggerUi, swaggerSpec } = require("./config/swagger");
const technicianRoutes = require("./modules/technician/technician.routes");
const companyRoutes = require("./modules/company/company.routes");
const app = express();


// Body Parser
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth Routes
const authRoutes = require("./modules/auth/auth.routes");


app.use("/api/auth", authRoutes);

app.use("/api/technicians", technicianRoutes);
app.use("/api/company", companyRoutes);

module.exports = app;