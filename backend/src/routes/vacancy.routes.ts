import { Router } from "express";
import { VacancyController } from "../controllers/vacancy.controler";

const router = Router();
const vacancyController = new VacancyController();

router.post("/", vacancyController.getAll); // GET /vacancies - все вакансии (для компании)
router.get("/:id", vacancyController.getById); // GET /vacancies/:id - одна вакансия
router.post("/create", vacancyController.add); // POST /vacancies - создать вакансию
router.put("/:id", vacancyController.update); // PUT /vacancies/:id - обновить вакансию
router.delete("/:id", vacancyController.delete); // DELETE /vacancies/:id - удалить вакансию
router.patch("/:id/status", vacancyController.updateStatus);

export { router as vacancyRoutes };
