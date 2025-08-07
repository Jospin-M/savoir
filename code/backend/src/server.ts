import authRouter from "./routes/authRoutes";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/auth/", authRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});