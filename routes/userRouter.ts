import express, { Router } from "express";
import multer from "multer";

import { getUsers, getUserById, createUser, updateUser, deleteUser, registerAdmin, registerMember, login } from "../controllers/userController";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

import { authorize, validateRoles } from "../middleware/authorization";

const userRouter = Router();
const upload = multer();

userRouter.get("/", [authorize, validateRoles(["admin", "superadmin"])], getUsers);
userRouter.get("/:id", [authorize, validateRoles(["admin", "superadmin"])], getUserById);
userRouter.post("/", [authorize, validateRoles(["superadmin"])], upload.none(), createUser);
userRouter.put("/:id", [authorize, validateRoles(["member", "admin", "superadmin"])], upload.none(), updateUser);
userRouter.delete("/:id", [authorize, validateRoles(["superadmin"])], deleteUser);

userRouter.post("/register/admin", [authorize, validateRoles(["superadmin"])], uploadOnMemory.single("avatar"), handleImageUpload, registerAdmin);
userRouter.post("/register/member", uploadOnMemory.single("avatar"), handleImageUpload, registerMember);
userRouter.post("/login", upload.none(), login)

export default userRouter;