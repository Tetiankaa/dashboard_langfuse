import { Router } from "express";

import sessionController from "../controllers/session.controller";


const router = Router();

router.get("", sessionController.getAll)

export const sessionRoutes = router;
