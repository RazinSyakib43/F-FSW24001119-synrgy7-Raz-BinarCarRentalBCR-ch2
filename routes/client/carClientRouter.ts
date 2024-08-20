import { Router } from "express";

import {
    getCars,
    searchCar,
    getCarByIdClient
} from "../../controllers/carController";

const carClientRouter = Router();

carClientRouter.get("/", getCars);
carClientRouter.get("/search", searchCar)
carClientRouter.get("/:id", getCarByIdClient);

export default carClientRouter;