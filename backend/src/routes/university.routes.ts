import { Router } from "express";
import { upload } from "../controllers/files.controller";
import { UniversityController } from "../controllers/university.controler";

const router = Router();
const univercityController = new UniversityController();

router.get("/", univercityController.getAll);
router.get("/:id", univercityController.getById);
router.post("/register", univercityController.add);
router.post("/login", univercityController.getByLogin);
router.put("/:id", univercityController.update);
router.delete("/:id", univercityController.delete);
router.post(
  "/:id/logo",
  upload.single("file"),
  univercityController.updateLogo
);

export { router as univercityRoutes };
