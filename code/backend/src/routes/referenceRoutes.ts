import * as express from "express";
import { getLanguages } from "../clients/referenceClient";

const router = express.Router();

router.get("/languages", getLanguages);

export default router;