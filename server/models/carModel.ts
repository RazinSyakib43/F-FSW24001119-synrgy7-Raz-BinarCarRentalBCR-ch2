import { Model, ModelObject } from "objection";
import { OrderModel } from "./orderModel"; // Import the orderModel class

export class CarModel extends Model {
    id!: number;
    name!: string;
    category!: string;
    price!: number;
    image!: string;
    created_at!: Date;
    created_by!: string;
    updated_at!: Date;
    updated_by!: string;
    status!: string;
    deleted_at!: Date;
    deleted_by!: string;
    order: any;

    static get tableName() {
        return 'car';
    }

    static get relationMappings() {
        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: OrderModel,
                join: {
                    from: 'car.id',
                    to: 'order.id_car'
                }
            }
        }
    }
}

export type Car = ModelObject<CarModel>;