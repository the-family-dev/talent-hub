import { Router } from "express";
import { InternshipController } from "../controllers/internship.controler";
import { upload } from "../controllers/files.controller";

const router = Router();
const controller = new InternshipController();

router.post("/", controller.getAll); // GET /vacancies - все вакансии (для компании)
router.get("/:id", controller.getById); // GET /vacancies/:id - одна вакансия
router.post("/create", upload.array("files"), controller.add); // POST /vacancies - создать вакансию
router.put("/:id", upload.array("files"), controller.update); // PUT /vacancies/:id - обновить вакансию
router.delete("/:id", controller.delete); // DELETE /vacancies/:id - удалить вакансию

export { router as internshipRoutes };
