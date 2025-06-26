import { authRouter } from "./routes/authRoutes";

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors()); // specify later the exact domain once website is deployed
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});