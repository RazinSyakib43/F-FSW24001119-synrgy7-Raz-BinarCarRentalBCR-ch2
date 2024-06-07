import { Request, Response } from 'express';

// Order Model
import { OrderModel } from '../models/orderModel';

async function getOrders(req: Request, res: Response) {
    try {
        const orders = await OrderModel.query().withGraphFetched("[car, user]");
        if (orders.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'orders not found'
            });
        } else {
            const ordersData = orders.map(orderItem => ({
                id: orderItem.id,
                user_email: orderItem.user.email,
                car_name: orderItem.car.name,
                start_rent: orderItem.start_rent,
                finish_rent: orderItem.finish_rent,
                price: orderItem.car.price,
                total_price: orderItem.total_price,
                status: orderItem.status,
                created_at: orderItem.created_at,
                updated_at: orderItem.updated_at
            }));

            res.status(200).send({
                code: 200,
                status: 'success',
                data: ordersData
            });
        }

        console.log('getOrders:', orders);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function getOrderById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const order = await OrderModel.query().findById(id).withGraphFetched("[car, user]");

        if (!order) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'order not found'
            });
        } else {
            const orderData = {
                id: order.id,
                user_email: order.user.email,
                car_name: order.car.name,
                start_rent: order.start_rent,
                finish_rent: order.finish_rent,
                price: order.car.price,
                total_price: order.total_price,
                status: order.status,
                created_at: order.created_at,
                updated_at: order.updated_at
            };

            res.status(200).send({
                code: 200,
                status: 'success',
                data: orderData
            });
        }

        console.log('getOrderById:', order);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function createOrder(req: Request, res: Response) {
    const { id_car, id_user, start_rent, rent_duration, status } = req.body;

    try {
        if (!id_car && !id_user && !start_rent && !rent_duration && !status) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'All fields are required'
            });
        } else if (!id_car) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Car is required'
            });
        } else if (!id_user) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'User is required'
            });
        } else if (!start_rent) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Start rent is required'
            });
        } else if (!rent_duration) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Rent duration is required'
            });
        } else if (!status) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Status is required'
            });
        } else if (status !== 'active' && status !== 'completed' && status !== 'cancelled') {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Status must be active, completed, or cancelled'
            });
        } else {
            const activeCar = await OrderModel.query().where('id_car', id_car).andWhere('status', 'active').first();

            if (activeCar) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Car is already rentedd'
                });
                return;
            }

            const order = await OrderModel.query().insert({
                id_car,
                id_user,
                start_rent,
                rent_duration,
                finish_rent: new Date(new Date(start_rent).getTime() + rent_duration * 24 * 60 * 60 * 1000),
                total_price: 0,
                status
            }).withGraphFetched("[car, user]");

            const carPrice = order.car.price;
            order.total_price = carPrice * rent_duration;

            await order.$query().patch();

            const orderData = {
                id: order.id,
                user_email: order.user.email,
                car_name: order.car.name,
                start_rent: order.start_rent,
                finish_rent: order.finish_rent,
                price: order.car.price,
                total_price: order.total_price,
                status: order.status,
                created_at: order.created_at,
                updated_at: order.updated_at
            };

            res.status(201).send({
                code: 201,
                status: 'success',
                message: 'Order created successfully',
                data: orderData
            });

            console.log('createOrder:', order);
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { id_car, id_user, start_rent, rent_duration, status } = req.body;

    try {
        const selectedOrder = await OrderModel.query().findById(id);
        console.log('selectedOrder : ', selectedOrder);

        if (!selectedOrder) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Order not found'
            });
        } else {
            const activeCar = await OrderModel.query().where('id_car', id_car).andWhere('status', 'active').first();

            if (activeCar) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Car is already rentedd'
                });
                return;
            }

            await OrderModel.query().findById(id).patch({
                id_car: id_car || selectedOrder?.id_car,
                id_user: id_user || selectedOrder?.id_user,
                start_rent: start_rent || selectedOrder?.start_rent,
                rent_duration: rent_duration || selectedOrder?.rent_duration,
                finish_rent: new Date(new Date(start_rent || selectedOrder?.start_rent).getTime() + (rent_duration || selectedOrder?.rent_duration) * 24 * 60 * 60 * 1000),
                total_price: 0,
                status: status || selectedOrder?.status,
                updated_at: new Date()
            });

            // Update total_price
            const updatedOrder = await OrderModel.query().findById(id).withGraphFetched("[car]");
            const carPrice = updatedOrder?.car.price;
            const total_price = carPrice * (rent_duration || updatedOrder?.rent_duration);

            await updatedOrder?.$query().patch({
                total_price: total_price
            });

            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'Order with id ' + id + ' updated successfully',
                data: {
                    id: id,
                    id_car: id_car || selectedOrder?.id_car,
                    id_user: id_user || selectedOrder?.id_user,
                    start_rent: start_rent || selectedOrder?.start_rent,
                    rent_duration: rent_duration || selectedOrder?.rent_duration,
                    total_price: total_price,
                    finish_rent: new Date(new Date(start_rent || selectedOrder?.start_rent).getTime() + (rent_duration || selectedOrder?.rent_duration) * 24 * 60 * 60 * 1000),
                    status: status || selectedOrder?.status,
                    updatedAt: new Date()
                }
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function deleteOrder(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const order = await OrderModel.query().findById(id);

        if (!order) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Order not found'
            });
        } else {
            await OrderModel.query().deleteById(id);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'Order with id ' + id + ' deleted successfully'
            });
        }

        console.log('deleteOrder : ', order);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

export { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };