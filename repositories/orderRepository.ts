import { OrderModel } from "../models/orderModel";

export class OrderRepository {
    async findAll() {
        return await OrderModel.query().withGraphFetched("[car, user]");
    }

    async findOrderById(id: string) {
        return await OrderModel.query().findById(id).withGraphFetched("[car, user]");
    }

    async findOrderByStatus(status: string) {
        return await OrderModel.query().where('status', status).withGraphFetched("[car, user]");
    }

    async getActiveCarByStatus(id_car: string) {
        return await OrderModel.query().where('id_car', id_car).andWhere('status', 'active').first();
    }

    async create(orderData: any) {
        return await OrderModel.query().insert(orderData).withGraphFetched("[car, user]");
    }

    async update(id: string, orderData: any) {
        return await OrderModel.query().findById(id).patch(orderData);
    }

    async delete(id: string, orderData: any) {
        return await OrderModel.query().findById(id).patch(orderData);
    }
}