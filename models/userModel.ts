import { Model, ModelObject } from "objection";
import { OrderModel } from "./orderModel"; // Import the orderModel class

export class UserModel extends Model {
    id!: number;
    name!: string;
    email!: string;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            orders: {
                relation: Model.HasManyRelation,
                modelClass: OrderModel,
                join: {
                    from: 'user.id',
                    to: 'order.user_id'
                }
            }
        }
    }
}

export type User = ModelObject<UserModel>;
