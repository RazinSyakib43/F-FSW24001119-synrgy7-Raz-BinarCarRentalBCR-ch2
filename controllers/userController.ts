import { Request, Response } from 'express';

import { UserService } from '../services/userService';

import { encryptPassword, checkPassword } from '../utils/encrypt';
import { generateToken } from '../utils/token';

import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';

// User Model
import { UserModel } from '../models/userModel';

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

            const newUser = await userService.registerMember(avatar, { name, email, password, avatar, role }, user);

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
        const user = await UserModel.query().findOne({ email: email });

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User email not found'
            });
        } else {
            const isPasswordMatch = await checkPassword(user.password, password);
            const token = await generateToken(user.email);
            const Role = user.role;

            if (Role !== "superadmin") {
                res.status(403).send({
                    code: 403,
                    status: 'Forbidden',
                    message: 'You are not superadmin'
                });
            } else if (!isPasswordMatch) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Password is incorrect'
                });
            } else {
                res.status(200).send({
                    code: 200,
                    status: 'success',
                    message: 'Login success',
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        token: token
                    }
                });
            }
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
        const user = await UserModel.query().findOne({ email: email });

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Admin email not found'
            });
        } else {
            const isPasswordMatch = await checkPassword(user.password, password);
            const token = await generateToken(user.email);
            const Role = user.role;

            if (Role !== "admin") {
                res.status(403).send({
                    code: 403,
                    status: 'Forbidden',
                    message: 'You are not an admin'
                });
            } else if (!isPasswordMatch) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Password is incorrect'
                });
            } else {
                res.status(200).send({
                    code: 200,
                    status: 'success',
                    message: 'Login success',
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        token: token
                    }
                });
            }
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
        const user = await UserModel.query().findOne({ email: email });

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Member email not found'
            });
        } else {
            const isPasswordMatch = await checkPassword(user.password, password);
            const token = await generateToken(user.email);
            const Role = user.role;

            if (!isPasswordMatch) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Password is incorrect'
                });
            } else if (Role !== "member") {
                res.status(403).send({
                    code: 403,
                    status: 'Forbidden',
                    message: 'You are not a member'
                });
            } else {
                res.status(200).send({
                    code: 200,
                    status: 'success',
                    message: 'Login success',
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        token: token
                    }
                });
            }
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

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                created_at: user.created_at,
                created_by: user.created_by,
                updated_at: user.updated_at,
                updated_by: user.updated_by
            };

            res.status(200).send({
                code: 200,
                status: 'success',
                data: userData
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

    const actorRole = (req as any).user.role;
    const actorName = (req as any).user.name;

    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    try {
        const user = (req as any).user;
        const userID = user.id;

        const selectedUser = await UserModel.query().findById(userID);

        console.log('selectedUser : ', selectedUser);

        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            cloudinary.uploader.upload(file, async function (error: UploadApiErrorResponse, result: UploadApiResponse) {
                const avatar = req.file ? result.secure_url : selectedUser.avatar;
                await UserModel.query().findById(userID).patch({
                    name: name || selectedUser?.name,
                    email: email || selectedUser?.email,
                    avatar: avatar || selectedUser?.avatar,
                    updated_at: new Date(),
                    updated_by: actorRole + " - " + actorName
                });

                res.status(200).send({
                    code: 200,
                    status: 'success',
                    message: 'User (' + actorRole + ') with id ' + userID + ' updated successfully',
                    data: {
                        id: userID,
                        name: name || selectedUser?.name,
                        email: email || selectedUser?.email,
                        avatar: avatar || selectedUser?.avatar,
                        updatedAt: new Date(),
                        updatedBy: actorRole + " - " + actorName
                    }
                });

                console.log('updateUser : ', userID);
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

        const selectedUser = await UserModel.query().findById(userID);

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            await UserModel.query().deleteById(userID);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User with id ' + selectedUser?.id + ' deleted successfully'
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