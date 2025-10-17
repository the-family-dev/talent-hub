import { Router } from "express";
import { PingController } from "../controllers/ping.controller";
import { ApplicationController } from "../controllers/application.controler";
import { upload } from "../controllers/files.controller";

const router = Router();

const controller = new ApplicationController();

router.post("/search", controller.getAll);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.post(
  "/public",
  upload.single("file"),
  controller.createPublicApplication
);

export { router as applicationRoutes };
