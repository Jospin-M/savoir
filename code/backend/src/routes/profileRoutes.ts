import { getProfile } from "../clients/profileClient";

import * as express from "express";

const router = express.Router();

router.get("/:id", getProfile);

export default router;