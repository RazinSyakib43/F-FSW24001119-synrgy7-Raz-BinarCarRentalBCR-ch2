import express, { Router } from "express";
import multer from "multer";

import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/orderController";

const orderRouter = Router();
const upload = multer();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", upload.none(), createOrder);
orderRouter.put("/:id", upload.none(), updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;