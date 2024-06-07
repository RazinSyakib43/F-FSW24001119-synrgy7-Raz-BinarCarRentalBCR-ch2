import { Model, ModelObject } from "objection";
import { OrderModel } from "./orderModel"; // Import the orderModel class

export class CarModel extends Model {
    id!: number;
    name!: string;
    category!: string;
    price!: number;
    image!: string;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'car';
    }

    static get relationMappings() {
        return {
            orders: {
                relation: Model.HasManyRelation,
                modelClass: OrderModel,
                join: {
                    from: 'car.id',
                    to: 'order.car_id'
                }
            }
        }
    }
}

export type Car = ModelObject<CarModel>;