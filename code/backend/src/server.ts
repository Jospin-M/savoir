import helmet from "helmet";
import router from "./routes/authRoutes";

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/auth/", router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});