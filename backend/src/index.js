const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const logRoutes = require("./routes/logs");
const teamRoutes = require("./routes/teams");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

async function startServer() {
  try {
    // 1. Connect to the database
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // 2. Sync all models
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    // Use port from environment variable or default to 5000
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server is running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// CORS configuration
app.use(
  cors({
    origin: "https://hrms-one-zeta.vercel.app/",
    credentials: true,
  })
);

// For development purposes, allow all origins
// app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Global API routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/logs", logRoutes);

// Global error handling middleware
app.use(errorHandler);

// Start the server
startServer();
