import { Router } from "express";
import { vacanciesRoutes } from "./vacancies.routes";
import { pinRoutes } from "./ping.routes";

const router = Router();

router.use("/test", pinRoutes);
router.use("/vacancies", vacanciesRoutes);
// TODO

export { router as apiRoutes };
