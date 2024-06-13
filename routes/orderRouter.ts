import express, { Router } from "express";
import multer from "multer";

import { authorize, validateRoles } from "../middleware/authorization";


import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/orderController";

const orderRouter = Router();
const upload = multer();

orderRouter.get("/", [authorize, validateRoles(["admin", "superadmin"])], getOrders);
orderRouter.get("/:id", [authorize, validateRoles(["admin", "superadmin"])], getOrderById);
orderRouter.post("/", [authorize, validateRoles(["member", "admin", "superadmin"])], upload.none(), createOrder);
orderRouter.put("/:id", [authorize, validateRoles(["admin", "superadmin"])], upload.none(), updateOrder);
orderRouter.delete("/:id", [authorize, validateRoles(["admin", "superadmin"])], deleteOrder);

export default orderRouter;