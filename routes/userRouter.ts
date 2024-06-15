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

    registerAdmin,
    registerMember,

    loginSuperadmin,
    loginAdmin,
    loginMember
} from "../controllers/userController";

import uploadOnMemory from "../middleware/multerMemory";
import { handleImageUpload } from "../middleware/errorHandler";

import { authorize, validateRoles } from "../middleware/authorization";

const userRouter = Router();
const upload = multer();

// User CRUD routes (only admin or superadmin can access)
userRouter.get("/", [authorize, validateRoles(["admin", "superadmin"])], getUsers);
userRouter.get("/by-id/:id", [authorize, validateRoles(["admin", "superadmin"])], getUserById);
userRouter.post("/", [authorize, validateRoles(["superadmin"])], upload.none(), createUser);
userRouter.put("/by-id/:id", [authorize, validateRoles(["superadmin"])], upload.single('avatar'), updateUser);
userRouter.delete("/by-id/:id", [authorize, validateRoles(["superadmin"])], deleteUser);

// User CRUD routes (based on their token)
userRouter.get("/me", [authorize], getCurrentUser);
userRouter.put("/me", [authorize, validateRoles(["member", "admin", "superadmin"])], uploadOnMemory.single("avatar"), updateCurrentUser);
userRouter.delete("/me", [authorize, validateRoles(["member", "admin", "superadmin"])], deleteCurrentUser);

// Register route
userRouter.post("/register/admin", [authorize, validateRoles(["superadmin"])], uploadOnMemory.single("avatar"), handleImageUpload, registerAdmin);
userRouter.post("/register/member", uploadOnMemory.single("avatar"), handleImageUpload, registerMember);

// Login route
userRouter.post("/login/superadmin", upload.none(), loginSuperadmin);
userRouter.post("/login/admin", upload.none(), loginAdmin);
userRouter.post("/login/member", upload.none(), loginMember);

export default userRouter;