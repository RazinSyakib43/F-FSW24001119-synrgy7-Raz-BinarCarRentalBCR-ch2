import { Request, Response } from 'express';

import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';

const authService = new AuthService();
const userService = new UserService();

async function registerAdmin(req: Request, res: Response) {
    const { name, email, password }: { name: string, email: string, password: string, avatar: string } = req.body;
    const role = "admin"

    const avatar = req.file;
    const user = (req as any).user;

    try {
        if (!name) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide name'
            });
        } else if (!email) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide email'
            });
        } else if (!password) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide password'
            });
        } else {
            const activeUser = await userService.getActiveUserByEmail(email);

            if (activeUser) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'This email is already taken'
                });
                return;
            }

            const newUser = await authService.registerAdmin(avatar, { name, email, password, avatar, role }, user);

            console.log('newUser : ', newUser);
            res.status(201).send({
                code: 201,
                status: 'success',
                message: 'User (Admin) created successfully',
                data: newUser
            });

            console.log('createUser : ', newUser);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function registerMember(req: Request, res: Response) {
    const { name, email, password }: { name: string, email: string, password: string, avatar: string } = req.body;
    const role = "member"

    const avatar = req.file;

    try {
        if (!name) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide name'
            });
        } else if (!email) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide email'
            });
        } else if (!password) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide password'
            });
        } else {
            const activeUser = await userService.getActiveUserByEmail(email);

            if (activeUser) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'This email is already taken'
                });
                return;
            }

            const newUser = await authService.registerMember(avatar, { name, email, password, avatar, role });

            console.log('newUser : ', newUser);
            res.status(201).send({
                code: 201,
                status: 'success',
                message: 'User (Member) created successfully',
                data: newUser
            });

            console.log('createUser : ', newUser);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function loginSuperadmin(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;

    try {
        const selectedUser = await userService.getActiveUserByEmail(email);
        const userRole = selectedUser?.role;

        if (userRole !== "superadmin") {
            res.status(403).send({
                code: 403,
                status: 'Forbidden',
                message: 'You are not a superadmin'
            });
        } else {
            const loginSuperadmin: any = await authService.loginSuperadmin(email, password);
            res.status(loginSuperadmin.code).send(loginSuperadmin);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}


async function loginAdmin(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;

    try {
        const selectedUser = await userService.getActiveUserByEmail(email);
        const userRole = selectedUser?.role;

        if (userRole !== "admin") {
            res.status(403).send({
                code: 403,
                status: 'Forbidden',
                message: 'You are not an admin'
            });
        } else {
            const loginAdmin: any = await authService.loginAdmin(email, password);
            res.status(loginAdmin.code).send(loginAdmin);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function loginMember(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;

    try {
        const selectedUser = await userService.getActiveUserByEmail(email);
        const userRole = selectedUser?.role;

        if (userRole !== "member") {
            res.status(403).send({
                code: 403,
                status: 'Forbidden',
                message: 'You are not a member'
            });
        } else {
            const loginMember: any = await authService.loginMember(email, password);
            res.status(loginMember.code).send(loginMember);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

export {
    registerAdmin,
    registerMember,

    loginSuperadmin,
    loginAdmin,
    loginMember
};