import { Router } from "express";
import { upload } from "../controllers/files.controller";
import { UserController } from "../controllers/user.controler";

const router = Router();
const controller = new UserController();

router.post("/register", controller.add);
router.post("/login", controller.getByLogin);
router.post("/:id/avatar", upload.single("file"), controller.updateAvatar);
router.put("/:id", controller.update);

export { router as userRoutes };
