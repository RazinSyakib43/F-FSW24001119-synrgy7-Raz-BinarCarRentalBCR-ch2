import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/userModel";

const SECRET_KEY = '77719d1f20ad7752933c6c00c1d18218b3fa3257612378920e93ae1b336ed51e';

export async function authorize(req: any, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;

        console.log(bearerToken)

        const tokenPayload = jwt.verify(bearerToken, SECRET_KEY) as any;

        req.user = await UserModel.query().findOne({ email: tokenPayload.email });

        if (!req.user) {
            return res.status(401).send({
                code: 401,
                status: "Unauthorized",
                message: "Token expired or invalid"
            });
        }

        next();

    } catch (err: any) {
        res.status(401).send({
            code: 401,
            status: "Unauthorized",
            message: "Please login first or register if you don't have an account"
        });
    }
}

export function validateRoles(role: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).send({
                    code: 401,
                    status: "Unauthorized",
                    message: "Token expired or invalid"
                });
            }

            if (!role.includes(req.user.role)) {
                return res.status(403).send({
                    code: 403,
                    status: "Forbidden",
                    message: "You're not allowed to access this endpoint"
                });
            }

            next();
        } catch (err: any) {
            res.status(500).send({
                code: 500,
                status: 'error',
                message: err.message
            });
        }
    }
}