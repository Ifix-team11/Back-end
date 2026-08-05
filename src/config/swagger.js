const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Fixit API",
      version: "1.0.0",
      description: "Fixit Backend API Documentation",
    },

    servers: [
      {
        url: "https://back-end-git-main-hagers-projects-df0172bd.vercel.app",
        description: "Production Server",
      },
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/modules/**/*.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};