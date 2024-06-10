import { Request, Response } from 'express';

import { encryptPassword, checkPassword } from '../utils/encrypt';
import { generateToken } from '../utils/token';

import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';

// User Model
import { UserModel } from '../models/userModel';

async function register(req: Request, res: Response) {
    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    cloudinary.uploader.upload(file, async function (error: UploadApiErrorResponse, result: UploadApiResponse) {
        try {
            const { name, email, password }: { name: string, email: string, password: string, avatar: string } = req.body;
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
                const encryptedPassword = await encryptPassword(password);

                const newUser = await UserModel.query().insert({
                    name: name,
                    email: email,
                    password: encryptedPassword as string,
                    avatar: result.url,
                });

                console.log('newUser : ', newUser);

                const userData = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    avatar: newUser.avatar,
                };

                res.status(201).send({
                    code: 201,
                    status: 'success',
                    message: 'User created successfully',
                    data: userData
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
    });
}

async function login(req: Request, res: Response) {
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

            if (!isPasswordMatch) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Password is incorrect'
                });
            } else {
                const token = await generateToken(user.email);
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
        const users = await UserModel.query();

        if (users.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Users not found'
            });
        } else {
            const usersData = users.map(userItem => ({
                id: userItem.id,
                name: userItem.name,
                email: userItem.email,
                created_at: userItem.created_at,
                updated_at: userItem.updated_at
            }));

            res.status(200).send({
                code: 200,
                status: 'success',
                data: usersData
            });
        }

        console.log('getUsers : ', users);
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
        const user = await UserModel.query().findById(id);

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
                created_at: user.created_at,
                updated_at: user.updated_at
            };

            res.status(200).send({
                code: 200,
                status: 'success',
                data: userData
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

async function createUser(req: Request, res: Response) {
    const { name, email }: { name: string, email: string } = req.body;
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
        } else {
            const newUser = await UserModel.query().insert({
                name: name,
                email: email
            });

            const userData = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };

            res.status(201).send({
                code: 201,
                status: 'success',
                message: 'User created successfully',
                data: userData
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

async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email }: { name: string, email: string } = req.body;

    try {
        const selectedUser = await UserModel.query().findById(id);

        console.log('selectedUser : ', selectedUser);

        if (!selectedUser) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            await UserModel.query().findById(id).patch({
                name: name || selectedUser?.name,
                email: email || selectedUser?.email,
                updated_at: new Date()
            });

            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User with id ' + id + ' updated successfully',
                data: {
                    id: id,
                    name: name || selectedUser?.name,
                    email: email || selectedUser?.email,
                    updatedAt: new Date().toISOString()
                }
            });

            console.log('updateUser : ', id);
        }
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
        const user = await UserModel.query().findById(id);

        if (!user) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'User not found'
            });
        } else {
            await UserModel.query().deleteById(id);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'User with id ' + user.id + ' deleted successfully'
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

export { getUsers, getUserById, createUser, updateUser, deleteUser, register, login };