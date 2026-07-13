require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const connect = require("./db");
const jobRoutes = require("./routes/jobs");

const app = express();
app.use(cors());
app.use(express.json());

// ⚡ Vercel Serverless සඳහා Database එක Connect කිරීමේ සරල Middleware එකක්
// මේකෙන් හැම request එකක්ම යද්දී DB එක connect වෙලාද කියලා බලනවා, නැත්නම් connect කරනවා.
app.use(async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/jobs", jobRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.name === "CastError" ? 400 : 500;
  res.status(status).json({ message: err.message });
});

// 💻 Local Environment එකේදී විතරක් සර්වර් එක listen කරන්න
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
}

// 🚀 Vercel එකට අනිවාර්යයෙන්ම app එක export කරන්න ඕනේ
module.exports = app;