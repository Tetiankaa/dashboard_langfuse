import { Router } from "express";

import traceController from "../controllers/trace.controller";

const router = Router();

router.get("", traceController.getAll)

export const traceRoutes = router;
