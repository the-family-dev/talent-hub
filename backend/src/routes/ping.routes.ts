import { Router } from "express";
import { PingController } from "../controllers/ping.controller";

const router = Router();

const pingController = new PingController();

router.use("/ping", pingController.ping);

export { router as pinRoutes };
