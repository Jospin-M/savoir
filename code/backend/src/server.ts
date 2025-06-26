const express = require("express");
const app = express();
const cors = require("cors");

import router from "./routes/authRoutes"

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/", router);

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
});