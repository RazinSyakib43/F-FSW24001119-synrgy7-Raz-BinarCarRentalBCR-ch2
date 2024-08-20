import express, { Router } from "express";
import multer from "multer";

import {
    registerAdmin,
    registerMember,

    loginSuperadmin,
    loginAdmin,
    loginMember
} from "../../controllers/authController";

import uploadOnMemory from "../../middleware/multerMemory";
import { handleImageUpload } from "../../middleware/errorHandler";

import { authorize, validateRoles } from "../../middleware/authorization";

const authRouter = Router();
const upload = multer();

// Register route
authRouter.post("/register/admin", [authorize, validateRoles(["superadmin"])], uploadOnMemory.single("avatar"), handleImageUpload, registerAdmin);
authRouter.post("/register/member", uploadOnMemory.single("avatar"), handleImageUpload, registerMember);

// Login route
authRouter.post("/login/superadmin", upload.none(), loginSuperadmin);
authRouter.post("/login/admin", upload.none(), loginAdmin);
authRouter.post("/login/member", upload.none(), loginMember);

export default authRouter;