import { getProfile, updateProfile } from "../clients/profileClient";

import * as express from "express";

const router = express.Router();

router.get("/:id", getProfile);

router.post("/me", updateProfile);

export default router;