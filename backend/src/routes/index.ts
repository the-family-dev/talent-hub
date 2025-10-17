import { Router } from "express";
import { vacancyRoutes } from "./vacancy.routes";
import { pingRoutes } from "./ping.routes";
import { companyRoutes } from "./company.routes";
import { userRoutes } from "./user.routes";
import { resumeController } from "./resume.routes";
import { tagRoutes } from "./tag.routes";
import { applicationRoutes } from "./application.routes";

const router = Router();

router.use("/test", pingRoutes);
router.use("/vacancies", vacancyRoutes);
router.use("/company", companyRoutes);
router.use("/applicant", userRoutes);
router.use("/resume", resumeController);
router.use("/tags", tagRoutes);
router.use("/application", applicationRoutes);
// TODO

export { router as apiRoutes };
