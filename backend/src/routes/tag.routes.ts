import { Router } from "express";
import { TagController } from "../controllers/tag.controller";

const router = Router();

const controller = new TagController();

router.get("/", controller.getAll);

export { router as tagRoutes };
