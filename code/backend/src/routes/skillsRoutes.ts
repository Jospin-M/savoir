import * as express from "express";
import { getCategories } from "../clients/skillsClient";

const router = express.Router();

router.get("/categories", getCategories);

export default router;

