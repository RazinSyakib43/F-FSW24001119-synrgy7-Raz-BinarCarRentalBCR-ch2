import express, { Router } from "express";
import multer from "multer";

import { getUsers, getUserById, createUser, updateUser, deleteUser, register, login } from "../controllers/userController";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

const userRouter = Router();
const upload = multer();

userRouter.get("/", getUsers);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", upload.none(), createUser);
userRouter.put("/:id", upload.none(), updateUser);
userRouter.delete("/:id", deleteUser);

userRouter.post("/register", uploadOnMemory.single("avatar"), handleImageUpload, register);
userRouter.post("/login", upload.none(), login)

export default userRouter;