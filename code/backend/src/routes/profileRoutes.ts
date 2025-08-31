import { getProfile, updateProfile, getAuthenticatedUserSkills } from "../clients/profilesClient";

import * as express from "express";

const router = express.Router();

router.get("/:id", getProfile);

router.put("/me", updateProfile);

router.get("/me/skills", getAuthenticatedUserSkills);

export default router;