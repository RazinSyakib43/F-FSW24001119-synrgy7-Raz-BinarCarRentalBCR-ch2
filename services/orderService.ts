import { OrderRepository } from "../repositories/orderRepository";
import { CarRepository } from "../repositories/carRepository";

export class OrderService {
    private orderRepository: OrderRepository;
    private carRepository: CarRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.carRepository = new CarRepository();
    }

    private orderData(order: any) {
        if (!order) return null;

        const orderItem = {
            id: order.id,
            userName: order.user?.name || null,
            userEmail: order.user?.email || null,
            carName: order.car?.name || null,
            startRent: order.start_rent,
            finishRent: order.finish_rent,
            price: order.car?.price || null,
            total_price: order.total_price,
            status: order.status,
            createdAt: order.created_at,
            createdBy: order.created_by,
            updatedAt: order.updated_at,
            updatedBy: order.updated_by,
            deletedAt: order.deleted_at,
            deletedBy: order.deleted_by,
        };

        return orderItem;
    }

    async getAllOrders(status: string) {
        const orders = await this.orderRepository.findAll();

        if (status === 'active') {
            const activeOrder = await this.orderRepository.findOrderByStatus('active');
            return activeOrder.map(order => this.orderData(order));
        } else if (status === 'completed') {
            const activeOrder = await this.orderRepository.findOrderByStatus('completed');
            return activeOrder.map(order => this.orderData(order));
        } else if (status === 'cancelled') {
            const activeOrder = await this.orderRepository.findOrderByStatus('cancelled');
            return activeOrder.map(order => this.orderData(order));
        } else if (status === 'deleted') {
            const activeOrder = await this.orderRepository.findOrderByStatus('deleted');
            return activeOrder.map(order => this.orderData(order));
        } else {
            return orders.map(order => this.orderData(order));
        }
    }

    async getOrderById(id: string) {
        const order = await this.orderRepository.findOrderById(id);
        return this.orderData(order);
    }

    async getActiveCarByStatus(id_car: string) {
        const car = await this.orderRepository.getActiveCarByStatus(id_car);
        return this.orderData(car);
    }

    async createOrder(orderItem: any, user: any) {
        const actorRole = user.role;
        const actorName = user.name;

        const selectedCar = await this.carRepository.findById(orderItem.id_car);
        console.log("selectedCar", selectedCar);
        const total_price = (selectedCar?.price ?? 0) * orderItem.rent_duration;

        const newOrderData = {
            ...orderItem,
            total_price: total_price,
            finish_rent: new Date(new Date(orderItem.start_rent).getTime() + orderItem.rent_duration * 24 * 60 * 60 * 1000),
            created_at: new Date(),
            created_by: `${actorRole} - ${actorName}`,
            updated_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
        };

        const newOrder = await this.orderRepository.create(newOrderData);

        return this.orderData(newOrder);
    }

    async updateOrder(id: string, orderItem: any, user: any) {
        const selectedOrder = await this.orderRepository.findOrderById(id);
        console.log("selectedOrder", selectedOrder);

        const actorRole = user.role;
        const actorName = user.name;

        const oldOrderData = {
            id_car: selectedOrder?.id_car,
            id_user: selectedOrder?.id_user,
            start_rent: selectedOrder?.start_rent,
            rent_duration: selectedOrder?.rent_duration,
            finish_rent: selectedOrder?.finish_rent,
            total_price: selectedOrder?.total_price,
            status: selectedOrder?.status,
        };
        console.log("oldOrderData", oldOrderData);

        const updatedOrderData = {
            id_car: orderItem.id_car || oldOrderData.id_car,
            id_user: orderItem.id_user || oldOrderData.id_user,
            start_rent: orderItem.start_rent || oldOrderData.start_rent,
            rent_duration: orderItem.rent_duration || oldOrderData.rent_duration,
            finish_rent: new Date(new Date(orderItem.start_rent || oldOrderData.start_rent).getTime() + (orderItem.rent_duration || oldOrderData.rent_duration) * 24 * 60 * 60 * 1000),
            total_price: 0,
            status: orderItem.status || oldOrderData.status,
            updated_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
        };

        // Update total_price
        const findOrder = await this.orderRepository.findOrderById(id);
        const carPrice = findOrder?.car.price;
        const rentDuration = updatedOrderData.rent_duration;
        const totalPrice = carPrice * rentDuration;
        updatedOrderData.total_price = totalPrice;

        await this.orderRepository.update(id, updatedOrderData);
        return this.orderData({ ...selectedOrder, ...updatedOrderData });
    }

    async deleteOrder(id: string, user: any) {
        const selectedOrder = await this.orderRepository.findOrderById(id);
        console.log("selectedOrder", selectedOrder);

        const actorRole = user.role;
        const actorName = user.name;

        const updatedOrderData = {
            status: 'deleted',
            deleted_at: new Date(),
            deleted_by: `${actorRole} - ${actorName}`,
        };

        await this.orderRepository.delete(id, updatedOrderData);
    }
}