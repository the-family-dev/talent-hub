import { Router } from "express";
import { PingController } from "../controllers/ping.controller";
import { ApplicationController } from "../controllers/application.controler";
import { upload } from "../controllers/files.controller";
import { AnalyticsController } from "../controllers/analytics.controler";

const router = Router();

const controller = new AnalyticsController();

router.post("/dashboard", controller.getDashboardData);

export { router as analyticsRoutes };
