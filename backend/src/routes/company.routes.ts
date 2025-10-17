import { Router } from "express";
import { VacanciesController } from "../controllers/vacancies.controler";
import { CompanyController } from "../controllers/company.controler";

const router = Router();
const companyController = new CompanyController();

router.get("/", companyController.getAll);
router.get("/:id", companyController.getById);
router.post("/register", companyController.add);
router.post("/login", companyController.getByLogin);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

export { router as companyRoutes };
