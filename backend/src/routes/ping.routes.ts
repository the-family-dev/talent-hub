import { Router } from "express";
import { PingController } from "../controllers/ping.controller";
import { sendMail } from "../controllers/email.controller";

const router = Router();

const pingController = new PingController();

router.use("/ping", pingController.ping);
router.post("/mail", sendMail);

export { router as pingRoutes };
