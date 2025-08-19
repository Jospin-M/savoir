import { getPresignedURL } from "../clients/filesClient";

import * as express from "express";

const router = express.Router();

router.post("/presign", getPresignedURL);

export default router;