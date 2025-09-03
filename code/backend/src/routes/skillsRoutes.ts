import * as express from "express";
import { updateSkills, getCategories } from "../clients/skillsClient";

const router = express.Router();

router.get("/categories", getCategories);

router.post("/", updateSkills);

// and get data for a specific user (GET "/skills/:user_id")

export default router;

