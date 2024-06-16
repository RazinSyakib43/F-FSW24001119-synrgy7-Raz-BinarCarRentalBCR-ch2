import { UserModel } from "../models/userModel";

export class UserRepository {
    async findAllUsers() {
        return await UserModel.query();
    }

    
    async findUserById(id: string) {
        return await UserModel.query().findById(id);
    }
    
    async findUserByEmail(email: string) {
        return await UserModel.query().findOne({ email });
    }

    async findActiveUserByEmail(email: string) {
        return await UserModel.query().where('email', email).first();
    }

    async createUser(userData: any) {
        return await UserModel.query().insert(userData);
    }

    async updateUser(id: string, userData: any) {
        return await UserModel.query().findById(id).patch(userData);
    }

    async deleteUser(id: string) {
        return await UserModel.query().deleteById(id);
    }
}