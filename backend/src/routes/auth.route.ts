import { Router } from "express"

import commonMiddleware from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/login",
    commonMiddleware.isBodyValid(UserValidator.login),
    authController.login
)
export const authRoutes = router;
