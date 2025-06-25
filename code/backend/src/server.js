const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

const PORT = 3000;

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
});