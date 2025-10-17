import { Router } from "express";
import { vacanciesRoutes } from "./vacancies.routes";
import { pingRoutes } from "./ping.routes";
import { companyRoutes } from "./company.routes";
import { userRoutes } from "./user.routes";
import { resumeController } from "./resume.routes";
import { tagRoutes } from "./tag.routes";

const router = Router();

router.use("/test", pingRoutes);
router.use("/vacancies", vacanciesRoutes);
router.use("/company", companyRoutes);
router.use("/applicant", userRoutes);
router.use("/resume", resumeController);
router.use("/tags", tagRoutes);
// TODO

export { router as apiRoutes };
