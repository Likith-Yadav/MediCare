const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://medicare-v934.onrender.com'  // Production frontend URL
    : 'http://localhost:3000',  // Development frontend URL
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

//routes
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/appointment", appointmentRoutes);

//port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
