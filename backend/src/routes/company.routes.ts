import { Router } from "express";
import { CompanyController } from "../controllers/company.controler";
import { upload } from "../controllers/files.controller";

const router = Router();
const companyController = new CompanyController();

router.get("/", companyController.getAll);
router.get("/:id", companyController.getById);
router.post("/register", companyController.add);
router.post("/login", companyController.getByLogin);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);
router.post("/:id/logo", upload.single("file"), companyController.updateLogo);

export { router as companyRoutes };
