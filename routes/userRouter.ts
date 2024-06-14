import express, { Router } from "express";
import multer from "multer";

import { getUsers, getUserById, getCurrentUser, createUser, updateUser, deleteUser, registerAdmin, registerMember, loginSuperadmin, loginAdmin, loginMember } from "../controllers/userController";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

import { authorize, validateRoles } from "../middleware/authorization";

const userRouter = Router();
const upload = multer();

// User CRUD routes
userRouter.get("/", [authorize, validateRoles(["admin", "superadmin"])], getUsers);
userRouter.get("/by-id/:id", [authorize, validateRoles(["admin", "superadmin"])], getUserById);
userRouter.get("/me", [authorize], getCurrentUser);
userRouter.post("/", [authorize, validateRoles(["superadmin"])], upload.none(), createUser);
userRouter.put("/:id", [authorize, validateRoles(["member", "admin", "superadmin"])], upload.none(), updateUser);
userRouter.delete("/:id", [authorize, validateRoles(["superadmin"])], deleteUser);

// Register route
userRouter.post("/register/admin", [authorize, validateRoles(["superadmin"])], uploadOnMemory.single("avatar"), handleImageUpload, registerAdmin);
userRouter.post("/register/member", uploadOnMemory.single("avatar"), handleImageUpload, registerMember);

// Login route
userRouter.post("/login/superadmin", upload.none(), loginSuperadmin);
userRouter.post("/login/admin", upload.none(), loginAdmin);
userRouter.post("/login/member", upload.none(), loginMember);

export default userRouter;