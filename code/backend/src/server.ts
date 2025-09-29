import authRouter from "./routes/authRoutes";
import fileRoutes from "./routes/filesRoutes";
import profileRouter from "./routes/profileRoutes";
import referenceRouter from "./routes/referenceRoutes";
import skillsRouter from "./routes/skillsRoutes";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import os from "os";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const API_ROOT = "/api/";

app.use(API_ROOT + "auth", authRouter);
app.use(API_ROOT + "files", fileRoutes);
app.use(API_ROOT + "profiles", profileRouter);
app.use(API_ROOT + "skills", skillsRouter);
app.use(API_ROOT + "references", referenceRouter);

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
    const interfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]> = os.networkInterfaces();

    Object.keys(interfaces).forEach((iface) => {
        interfaces[iface]?.forEach((details: os.NetworkInterfaceInfo) => {
        if (details.family === "IPv4" && !details.internal) {
            console.log(`Server running at http://${details.address}:${PORT}`);
        }
        });
  });
});