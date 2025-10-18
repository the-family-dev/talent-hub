import { Router } from "express";
import { upload } from "../controllers/files.controller";
import { UniversityController } from "../controllers/university.controler";

const router = Router();
const universityController = new UniversityController();

router.get("/", universityController.getAll);
router.get("/:id", universityController.getById);
router.post("/register", universityController.add);
router.post("/login", universityController.getByLogin);
router.put("/:id", universityController.update);
router.delete("/:id", universityController.delete);
router.post(
  "/:id/logo",
  upload.single("file"),
  universityController.updateLogo
);

export { router as universityRoutes };
