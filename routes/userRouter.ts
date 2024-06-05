import express, { Router } from "express";
import multer from "multer";

import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController";

const userRouter = Router();
const upload = multer();

userRouter.get("/", getUsers);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", upload.none(), createUser);
userRouter.put("/:id", upload.none(), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;