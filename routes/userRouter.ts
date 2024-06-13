import express, { Router } from "express";
import multer from "multer";

import { getUsers, getUserById, createUser, updateUser, deleteUser, register, login } from "../controllers/userController";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

import { authorize } from "../middleware/authorization";

const userRouter = Router();
const upload = multer();

userRouter.get("/", authorize, getUsers);
userRouter.get("/", authorize, getUsers);
userRouter.get("/:id", authorize, getUserById);
userRouter.post("/", authorize, upload.none(), createUser);
userRouter.put("/:id", authorize, upload.none(), updateUser);
userRouter.delete("/:id", authorize, deleteUser);

userRouter.post("/register", uploadOnMemory.single("avatar"), handleImageUpload, register);
userRouter.post("/login", upload.none(), login)

export default userRouter;