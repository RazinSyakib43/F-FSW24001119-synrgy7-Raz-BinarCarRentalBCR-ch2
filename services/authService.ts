import { UserRepository } from "../repositories/userRepository";

import { uploadToCloudinary } from '../utils/uploadUtil';
import { UploadApiResponse } from 'cloudinary';

import { encryptPassword, checkPassword } from '../utils/encrypt';
import { generateToken } from '../utils/token';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    private userData(user: any) {
        if (!user) return null;

        const userItem = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            createdAt: user.created_at,
            createdBy: user.created_by,
            updatedAt: user.updated_at,
            updatedBy: user.updated_by,
            status: user.status,
            deletedAt: user.deleted_at,
            deletedBy: user.deleted_by,
        };

        return userItem;
    }

    async registerAdmin(file: any, userItem: any, user: any) {
        const uploadResult: UploadApiResponse = await uploadToCloudinary(file);

        const actorRole = user.role;
        const actorName = user.name;

        const encryptedPassword = await encryptPassword(userItem.password);

        const newUserData = {
            ...userItem,
            password: encryptedPassword,
            avatar: uploadResult.url,
            created_by: `${actorRole} - ${actorName}`,
            created_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
            updated_at: new Date(),
        };

        const newUser = await this.userRepository.createUser(newUserData);
        return this.userData(newUser);
    }

    async registerMember(file: any, userItem: any) {
        const uploadResult: UploadApiResponse = await uploadToCloudinary(file);

        const encryptedPassword = await encryptPassword(userItem.password);

        const newUserData = {
            ...userItem,
            password: encryptedPassword,
            avatar: uploadResult.url,
            created_by: 'member' + ' - ' + userItem.name,
            created_at: new Date(),
            updated_by: 'member' + ' - ' + userItem.name,
            updated_at: new Date(),
        };

        const newUser = await this.userRepository.createUser(newUserData);
        return this.userData(newUser);
    }

    async loginSuperadmin(email: string, password: string) {
        const selectedUser = await this.userRepository.findActiveUserByEmail(email);
        if (!selectedUser) {
            return {
                code: 404,
                status: 'fail',
                message: 'Superadmin email not found'
            }
        }

        const isPasswordMatch = await checkPassword(selectedUser.password, password);
        if (!isPasswordMatch) {
            return {
                code: 400,
                status: 'fail',
                message: 'Password is incorrect'
            };
        }

        const token = await generateToken(selectedUser.email);
        if (token) {
            return {
                code: 200,
                status: 'success',
                message: 'Successfully login as superadmin! Welcome, ' + selectedUser.name + '!',
                data: {
                    token: token,
                },
            };
        }
    }

    async loginAdmin(email: string, password: string) {
        const selectedUser = await this.userRepository.findActiveUserByEmail(email);
        if (!selectedUser) {
            return {
                code: 404,
                status: 'fail',
                message: 'Admin email not found'
            }
        }

        const isPasswordMatch = await checkPassword(selectedUser.password, password);
        if (!isPasswordMatch) {
            return {
                code: 400,
                status: 'fail',
                message: 'Password is incorrect'
            };
        }

        const token = await generateToken(selectedUser.email);
        if (token) {
            return {
                code: 200,
                status: 'success',
                message: 'Successfully login as admin! Welcome, ' + selectedUser.name + '!',
                data: {
                    token: token,
                },
            };
        }
    }

    async loginMember(email: string, password: string) {
        const selectedUser = await this.userRepository.findActiveUserByEmail(email);
        if (!selectedUser) {
            return {
                code: 404,
                status: 'fail',
                message: 'Member email not found'
            }
        }

        const isPasswordMatch = await checkPassword(selectedUser.password, password);
        if (!isPasswordMatch) {
            return {
                code: 400,
                status: 'fail',
                message: 'Password is incorrect'
            };
        }

        const token = await generateToken(selectedUser.email);
        if (token) {
            return {
                code: 200,
                status: 'success',
                message: 'Successfully login as member! Welcome, ' + selectedUser.name + '!',
                data: {
                    token: token,
                },
            };
        }
    }
}