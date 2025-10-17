import { Router } from "express";
import { vacanciesRoutes } from "./vacancies.routes";
import { pinRoutes } from "./ping.routes";
import { companyRoutes } from "./company.routes";

const router = Router();

router.use("/test", pinRoutes);
router.use("/vacancies", vacanciesRoutes);
router.use("/company", companyRoutes);
// TODO

export { router as apiRoutes };
