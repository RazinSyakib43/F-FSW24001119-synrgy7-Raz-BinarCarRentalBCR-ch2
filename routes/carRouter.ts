import { Router } from "express";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

import { getCars, searchCar, getCarById, addCar, updateCar, deleteCar } from "../controllers/carController";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/search", searchCar)
carRouter.get("/:id", getCarById);
carRouter.post("/", uploadOnMemory.single("image"), handleImageUpload, addCar);
carRouter.put("/:id", uploadOnMemory.single("image"), updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;