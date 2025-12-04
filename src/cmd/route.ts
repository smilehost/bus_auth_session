import { Router } from "express";
import AuthHandler from "../handler/auth.handler";

const router = Router();

router.get('/service/:serviceId', AuthHandler.getService);

export default router;