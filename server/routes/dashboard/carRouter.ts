import { Router } from "express";

import uploadOnMemory from "../../middleware/multerMemory";
import { handleImageUpload } from "../../middleware/errorHandler";

import { authorize, validateRoles } from "../../middleware/authorization";

import {
    getAllCars,
    getCarsDashboard,
    getCarById,
    addCar,
    updateCar,
    deleteCar
} from "../../controllers/carController";

const carRouter = Router();

carRouter.get("/", getAllCars);
carRouter.get("/dashboard", getCarsDashboard);
carRouter.get("/:id", getCarById);
carRouter.post("/", [authorize, validateRoles(["admin", "superadmin"])], uploadOnMemory.single("image"), handleImageUpload, addCar);
carRouter.put("/:id", [authorize, validateRoles(["admin", "superadmin"])], uploadOnMemory.single("image"), updateCar);
carRouter.delete("/:id", [authorize, validateRoles(["admin", "superadmin"])], deleteCar);

export default carRouter;