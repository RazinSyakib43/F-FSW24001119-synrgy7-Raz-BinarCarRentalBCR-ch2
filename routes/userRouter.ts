import express, { Router } from "express";
import multer from "multer";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
} from "../controllers/userController";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

import { authorize, validateRoles } from "../middleware/authorization";

const userRouter = Router();
const upload = multer();

// User CRUD routes (only admin or superadmin can access)
userRouter.get("/", [authorize, validateRoles(["admin", "superadmin"])], getUsers);
userRouter.get("/by-id/:id", [authorize, validateRoles(["admin", "superadmin"])], getUserById);
userRouter.post("/", [authorize, validateRoles(["superadmin"])], uploadOnMemory.single('avatar'), createUser);
userRouter.put("/by-id/:id", [authorize, validateRoles(["superadmin"])], uploadOnMemory.single('avatar'), updateUser);
userRouter.delete("/by-id/:id", [authorize, validateRoles(["superadmin"])], deleteUser);

// User CRUD routes (based on their token)
userRouter.get("/me", authorize, getCurrentUser);
userRouter.put("/me", authorize, uploadOnMemory.single("avatar"), updateCurrentUser);
userRouter.delete("/me", authorize, deleteCurrentUser);

export default userRouter;