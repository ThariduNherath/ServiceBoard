require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const connect = require("./db");
const jobRoutes = require("./routes/jobs");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.name === "CastError" ? 400 : 500;
  res.status(status).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
connect().then(() => app.listen(PORT, () => console.log(`API running on :${PORT}`)));