import { Request, Response, NextFunction } from "express";

// Middleware handleImageUpload, if no image file uploaded
function handleImageUpload(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
        // Check if image file exists in the request
        res.status(400).send({
            code: 400,
            status: "fail",
            message: "No image file uploaded",
        });
        return;
    }
    next();
}

export { handleImageUpload };
