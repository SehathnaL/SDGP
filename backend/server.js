require("dotenv").config();

const express = require("express");
const cors = require("cors");
const interviewRoutes = require("./routes/interviewRoutes");
const ttsRoutes = require("./routes/ttsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api", interviewRoutes);

app.use("/api", ttsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
