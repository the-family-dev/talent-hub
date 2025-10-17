import { Router } from "express";
import { PingController } from "../controllers/ping.controller";
import { ApplicationController } from "../controllers/application.controler";

const router = Router();

const controller = new ApplicationController();

router.get("/", controller.getAll);
router.post("/", controller.add);

export { router as applicationRoutes };
