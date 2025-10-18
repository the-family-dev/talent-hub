import { Router } from "express";
import { vacancyRoutes } from "./vacancy.routes";
import { pingRoutes } from "./ping.routes";
import { companyRoutes } from "./company.routes";
import { userRoutes } from "./user.routes";
import { resumeController } from "./resume.routes";
import { catalogRoutes } from "./tag.routes";
import { applicationRoutes } from "./application.routes";
import { univercityRoutes } from "./university.routes";

const router = Router();

router.use("/test", pingRoutes);
router.use("/vacancies", vacancyRoutes);
router.use("/company", companyRoutes);
router.use("/univercity", univercityRoutes);
router.use("/applicant", userRoutes);
router.use("/resume", resumeController);
router.use("/catalog", catalogRoutes);
router.use("/application", applicationRoutes);
// TODO

export { router as apiRoutes };
