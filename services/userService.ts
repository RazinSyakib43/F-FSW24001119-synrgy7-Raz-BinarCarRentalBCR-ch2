import { UserRepository } from "../repositories/userRepository";

import { uploadToCloudinary } from '../utils/uploadUtil';
import { UploadApiResponse } from 'cloudinary';

import { encryptPassword, checkPassword } from '../utils/encrypt';
import { generateToken } from '../utils/token';

export class UserService {
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

    async getAllUsers() {
        const users = await this.userRepository.findAllUsers();
        return users.map(user => this.userData(user));
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findUserById(id);
        return this.userData(user);
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findUserByEmail(email);
        return this.userData(user);
    }

    async getActiveUserByEmail(email: string) {
        const user = await this.userRepository.findActiveUserByEmail(email);
        return this.userData(user);
    }

    async addUser(file: any, userItem: any, user: any){
        const uploadResult: UploadApiResponse = await uploadToCloudinary(file);

        const actorRole = user.role;
        const actorName = user.name;

        const newUserData = {
            ...userItem,
            avatar: uploadResult.url,
            created_by: `${actorRole} - ${actorName}`,
            created_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
            updated_at: new Date(),
        };

        const newUser = await this.userRepository.createUser(newUserData);
        return this.userData(newUser);
    
    }

    async updateUser(id: string, userItem: any, file: any, user: any) {
        const selectedUser = await this.userRepository.findUserById(id);
        console.log(selectedUser);

        const actorRole = user.role;
        const actorName = user.name;

        const oldUserData = {
            name: selectedUser?.name,
            email: selectedUser?.email,
            avatar: selectedUser?.avatar,
            role: selectedUser?.role,
        };

        const updatedUserData = {
            name: userItem.name || oldUserData.name,
            email: userItem.email || oldUserData.email,
            avatar: file ? (await uploadToCloudinary(file)).url : oldUserData.avatar,
            role: userItem.role || oldUserData.role,
            updated_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
        };

        await this.userRepository.updateUser(id, updatedUserData);
        return this.userData({ ...selectedUser, ...updatedUserData });
    }

    async deleteUser(id: string, user: any) {
        const selectedUser = await this.userRepository.findUserById(id);
        console.log(selectedUser);

        const actorRole = user.role;
        const actorName = user.name;

        const deletedUserData = {
            status: 'deleted',
            deleted_at: new Date(),
            deleted_by: `${actorRole} - ${actorName}`,
        };
        return await this.userRepository.deleteUser(id, deletedUserData);
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
        if (!selectedUser){
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