import { Router } from "express";
import { ResumeController } from "../controllers/resume.controller";
import { upload } from "../controllers/files.controller";

const router = Router();

const controller = new ResumeController();

router.get("/:id", controller.getById);
router.post("/", controller.add);
router.post("/search", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/:id/pdf", upload.single("file"), controller.uploadPdf);
export { router as resumeController };
