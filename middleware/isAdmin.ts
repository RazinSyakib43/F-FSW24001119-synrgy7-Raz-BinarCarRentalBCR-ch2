import { Request, Response, NextFunction } from "express";

// Middleware isAdmin, to check if the user is an admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { iam } = req.query;
  if (iam === "admin") {
    // kalau query iam === admin, maka lanjut ke middleware selanjutnya
    next();
    return;
  }
  // kalau query iam !== admin, maka kirim response error
  res.status(403).send({
    code: 403,
    status: "fail",
    message: "You are not an admin, you can't access this route",
  });
}

export default isAdmin;