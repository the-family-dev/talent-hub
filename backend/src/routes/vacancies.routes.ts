import { Router } from "express";
import { VacanciesController } from "../controllers/vacancies.controler";

const router = Router();
const vacanciesController = new VacanciesController();

router.post("/", vacanciesController.getAll); // GET /vacancies - все вакансии (для компании)
router.get("/:id", vacanciesController.getById); // GET /vacancies/:id - одна вакансия
router.post("/create", vacanciesController.add); // POST /vacancies - создать вакансию
router.put("/:id", vacanciesController.update); // PUT /vacancies/:id - обновить вакансию
router.delete("/:id", vacanciesController.delete); // DELETE /vacancies/:id - удалить вакансию

export { router as vacanciesRoutes };
