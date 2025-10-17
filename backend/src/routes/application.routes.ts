import { Router } from "express";
import { PingController } from "../controllers/ping.controller";
import { ApplicationController } from "../controllers/application.controler";

const router = Router();

const controller = new ApplicationController();

router.post("/search", controller.getAll);
router.post("/", controller.add);
router.put("/:id", controller.update);

export { router as applicationRoutes };
