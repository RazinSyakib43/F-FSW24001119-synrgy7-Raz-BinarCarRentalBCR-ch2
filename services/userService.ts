import { UserRepository } from "../repositories/userRepository";

import { uploadToCloudinary } from '../utils/uploadUtil';
import { UploadApiResponse } from 'cloudinary';

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
        };

        const updatedUserData = {
            name: userItem.name || oldUserData.name,
            email: userItem.email || oldUserData.email,
            avatar: file ? (await uploadToCloudinary(file)).url : oldUserData.avatar,
            updated_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
        };

        const updatedUser = await this.userRepository.updateUser(id, updatedUserData);
        return this.userData(updatedUser);
    }

    async deleteUser(id: string) {
        return await this.userRepository.deleteUser(id);
    }
}