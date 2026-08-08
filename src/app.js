const express = require("express");
const cors = require("cors");

const { swaggerUi, swaggerSpec } = require("./config/swagger");

const technicianRoutes = require("./modules/technician/technician.routes");
const companyRoutes = require("./modules/company/company.routes");
const authRoutes = require("./modules/auth/auth.routes");
const orderRoutes = require("./modules/order/order.routes");

const app = express();


// CORS
app.use(cors({
  origin: "*",
  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS"
  ],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]
}));


// Body Parser
app.use(express.json());


// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://unpkg.com/swagger-ui-dist/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"
    ]
  })
);

console.log("Swagger loaded");


// Auth Routes
app.use("/api/auth", authRoutes);


// Technician Routes
app.use("/api/technicians", technicianRoutes);


// Company Routes
app.use("/api/companies", companyRoutes);


// Order Routes
app.use("/api/orders", orderRoutes);


module.exports = app;