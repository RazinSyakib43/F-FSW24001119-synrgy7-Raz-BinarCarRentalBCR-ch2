import { Request, Response } from 'express';

import { UserService } from '../services/userService';

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

            const newUser = await userService.registerAdmin(avatar, { name, email, password, avatar, role }, user);

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

            const newUser = await userService.registerMember(avatar, { name, email, password, avatar, role });

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
            const loginSuperadmin: any = await userService.loginSuperadmin(email, password);
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
            const loginAdmin: any = await userService.loginAdmin(email, password);
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
            const loginMember: any = await userService.loginMember(email, password);
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

async function getUsers(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send({
            code: 200,
            status: 'success',
            data: users,
        });
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user = await userService.getUserById(id);

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: user
            });
        }

        console.log('getUserById : ', user);

    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function getCurrentUser(req: Request, res: Response) {
    try {
        const user = (req as any).user;

        console.log('getCurrentUser : ', user);

        const selectedUser = await userService.getUserById(user.id);

        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: selectedUser
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function createUser(req: Request, res: Response) {
    const { name, email, password, role }: { name: string, email: string, password: string, role: string } = req.body;

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
        } else if (!role) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide role'
            });
        } else if (role !== "member" && role !== "admin" && role !== "superadmin") {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Role must be member, admin, or superadmin'
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

            const newUser = await userService.addUser(avatar, { name, email, password, avatar, role }, user);

            res.status(201).send({
                code: 201,
                status: 'success',
                message: 'User (' + role + ') created successfully',
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

async function updateCurrentUser(req: Request, res: Response) {
    const { name, email }: { name: string, email: string } = req.body;

    const avatar = req.file;
    const user = (req as any).user;

    const userID = user.id;

    try {
        const selectedUser = await userService.getUserById(userID);
        const userRole = selectedUser?.role;

        console.log('selectedUser : ', selectedUser);

        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            const updatedUser = await userService.updateUser(userID, { name, email }, avatar, user);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User (' + userRole + ') with id ' + selectedUser?.id + ' updated successfully',
                data: updatedUser
            });

            console.log('updateUser : ', updatedUser);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, role }: { name: string, email: string, role: string } = req.body;

    const avatar = req.file;
    const user = (req as any).user;

    try {
        const selectedUser = await userService.getUserById(id);
        console.log('selectedUser : ', selectedUser);

        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            const updatedUser = await userService.updateUser(id, { name, email, role }, avatar, user);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User with id ' + id + ' updated successfully',
                data: updatedUser
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function deleteCurrentUser(req: Request, res: Response) {
    try {
        const user = (req as any).user;

        const userID = user.id;

        const selectedUser = await userService.getUserById(userID);
        const userRole = selectedUser?.role;

        console.log('selectedUser : ', selectedUser);

        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            await userService.deleteUser(userID);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User (' + userRole + ') with id ' + selectedUser?.id + ' deleted successfully'
            });
        }

        console.log('deleteUser : ', user);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const selectedUser = await userService.getUserById(id);
        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            await userService.deleteUser(id);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User with id ' + selectedUser.id + ' deleted successfully'
            });
        }
        console.log('deleteUser : ', selectedUser);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

export {
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
};