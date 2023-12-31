const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const faqRouter = require("./routes/faq.route");
const verifyToken = require("./middleware/verifyToken");
const adminCheck = require("./middleware/adminCheck");
const adminRouter = require("./routes/admin.route");
require("dotenv").config();

const app = express();
const PORT = process.env.Backend_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/faq", verifyToken, faqRouter);
app.use("/api/admin", verifyToken, adminCheck, adminRouter);
// Connect to MongoDB
const mongoURI = process.env.MongoDB_URL;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
