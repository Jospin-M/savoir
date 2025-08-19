import { getProfile, updateProfile } from "../clients/profilesClient";

import * as express from "express";

const router = express.Router();

router.get("/:id", getProfile);

router.put("/me", updateProfile);

export default router;