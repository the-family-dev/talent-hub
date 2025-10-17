import { Router } from "express";
import { VacanciesController } from "../controllers/vacancies.controler";

const router = Router();
const vacanciesController = new VacanciesController();

router.get("/", vacanciesController.getVacancies);
router.post("/", vacanciesController.addVacancy);

export { router as vacanciesRoutes };
