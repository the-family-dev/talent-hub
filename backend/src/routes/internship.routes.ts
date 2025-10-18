import { Router } from "express";
import { VacancyController } from "../controllers/vacancy.controler";
import { InternshipController } from "../controllers/internship.controler";

const router = Router();
const controller = new InternshipController();

router.post("/", controller.getAll); // GET /vacancies - все вакансии (для компании)
router.get("/:id", controller.getById); // GET /vacancies/:id - одна вакансия
router.post("/create", controller.add); // POST /vacancies - создать вакансию
router.put("/:id", controller.update); // PUT /vacancies/:id - обновить вакансию
router.delete("/:id", controller.delete); // DELETE /vacancies/:id - удалить вакансию

export { router as internshipRoutes };
