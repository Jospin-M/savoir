import authRouter from "./routes/authRoutes";
import profileRouter from "./routes/profileRoutes";
import referenceRotuer from "./routes/referenceRoutes";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const API_ROOT = "/api/";

app.use(API_ROOT + "auth", authRouter);
app.use(API_ROOT + "profile", profileRouter);
app.use(API_ROOT + "reference", referenceRotuer)


const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});