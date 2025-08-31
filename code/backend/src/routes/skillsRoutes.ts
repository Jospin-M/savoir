import * as express from "express";
import { addSkill, getCategories } from "../clients/skillsClient";

const router = express.Router();

router.get("/categories", getCategories);

router.post("/", addSkill);
// implement routes to post data (POST "/skills") 
// and get data for a specific user (GET "/skills/:user_id")

export default router;

