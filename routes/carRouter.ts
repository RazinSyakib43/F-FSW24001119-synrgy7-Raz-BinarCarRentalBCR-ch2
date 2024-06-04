import { Router } from "express";

import upload from "../middleware/multer";
import uploadOnMemory from "../middleware/multerMemory";

import { getCars, searchCar, getCarById, addCar, updateCar, deleteCar } from "../controllers/carController";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/search", searchCar)
carRouter.get("/:id", getCarById);
carRouter.post("/", uploadOnMemory.single("image"), addCar);
carRouter.put("/:id", uploadOnMemory.single("image"), updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;