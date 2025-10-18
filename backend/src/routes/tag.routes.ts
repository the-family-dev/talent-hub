import { Router } from "express";
import { CatalogController } from "../controllers/catalog.controller";

const router = Router();

const controller = new CatalogController();

router.get("/tags", controller.getAllTags);
router.get("/company", controller.getAllCompany);

export { router as catalogRoutes };
