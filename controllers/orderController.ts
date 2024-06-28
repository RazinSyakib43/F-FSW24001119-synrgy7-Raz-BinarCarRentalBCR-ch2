import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

import { OrderModel } from '../models/orderModel';

const orderService = new OrderService();

async function getOrders(req: Request, res: Response) {
    const { status }: { status: string } = req.query as { status: string };

    try {
        const orders = await orderService.getAllOrders(status);
        if (orders.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'orders not found'
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: orders
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
        const order = await orderService.getOrderById(id);

        if (!order) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'order not found'
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: order
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

    const user = (req as any).user;

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
            const activeCar = await orderService.getActiveCarByStatus(id_car);

            if (activeCar) {
                res.status(400).send({
                    code: 400,
                    status: 'fail',
                    message: 'Car is already rented'
                });
            } else {
                const order = await orderService.createOrder({ id_car, id_user, start_rent, rent_duration, status }, user);

                res.status(201).send({
                    code: 201,
                    status: 'success',
                    message: 'Order created successfully',
                    data: order
                });

                console.log('createOrder:', order);
            }
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
    const { id_car, id_user, start_rent, rent_duration, status }= req.body;

    const user = (req as any).user;

    try {
        const selectedOrder = await orderService.getOrderById(id);
        console.log('selectedOrder : ', selectedOrder);

        if (!selectedOrder) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Order not found'
            });
        } else if (!id_car && !id_user && !start_rent && !rent_duration && !status) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please fill one of the required fields (car, user, start_rent, rent_duration, status)'
            });
        } else {
            if (id_car) {
                const activeCar = await orderService.getActiveCarByStatus(id_car);

                if (activeCar) {
                    return res.status(400).send({
                        code: 400,
                        status: 'fail',
                        message: 'Car is already rented'
                    });
                }
            }

            const order = await orderService.updateOrder(id, { id_car, id_user, start_rent, rent_duration, status }, user);

            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'Order with id ' + id + ' updated successfully',
                data: order
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

    const user = (req as any).user;

    try {
        const order = await orderService.getOrderById(id);

        if (!order) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Order not found'
            });
        } else {
            await orderService.deleteOrder(id, user);
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