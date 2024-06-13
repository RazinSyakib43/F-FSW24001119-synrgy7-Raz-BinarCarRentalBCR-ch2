import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/userModel";

const SECRET_KEY = '77719d1f20ad7752933c6c00c1d18218b3fa3257612378920e93ae1b336ed51e';

export async function authorize(req: any, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;

        console.log(bearerToken)

        const tokenPayload = jwt.verify(bearerToken, SECRET_KEY) as any;

        req.user = await UserModel.query().findOne({ email: tokenPayload.email }) ;

        next();

    } catch (err : any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: "You're not authorized to access this endpoint"
        });
    }
}