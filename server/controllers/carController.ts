import { Request, Response } from 'express';
import { CarService } from '../services/carService';

const carService = new CarService();

export async function getCars(req: Request, res: Response) {
    // const { isAvailable }: { isAvailable: string } = req.query as { isAvailable: string };
    const { driverType } = req.query as { driverType: any } as { driverType: any };
    // const { availableAt } = req.query as { availableAt: unknown } as { availableAt: Date };
    // const { capacity }: { capacity: string } = req.query as { capacity: string };

    try {
        const cars = await carService.getAllCars(driverType === 'true' ? true : false);
        if (!driverType) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide driverType query parameter',
            });
        } else if (cars.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found',
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: cars,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}

export async function searchCar(req: Request, res: Response) {
    const { title }: { title: string } = req.query as { title: string };

    try {
        const cars = await carService.searchCars(title);
        if (cars.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car that you are looking for is not found',
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: cars,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}

export async function getCarById(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };

    try {
        const car = await carService.getCarById(id);
        if (!car) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found',
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: car,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}

export async function addCar(req: Request, res: Response) {
    const { name, category, price }: { name: string; category: string; price: number } = req.body;

    const image = req.file;
    const user = (req as any).user;

    console.log(req.body);

    try {
        if (!name && !category && !price && !image) {
            return res.status(400).send({
                code: 400,
                status: "fail",
                message: "Please fill all required fields (name, category, price, image)",
            });
        } else {
            const newCar = await carService.addCar(image, { name, category, price }, user);

            res.status(201).send({
                code: 201,
                status: "success",
                message: "Car added successfully",
                data: newCar,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}

export async function updateCar(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };
    const { name, category, price }: { name: string; category: string; price: number } = req.body;

    const image = req.file;
    const user = (req as any).user;

    try {
        const car = await carService.getCarById(id);
        if (!car) {
            return res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found',
            });
        } else if (name || category || price || image) {
            const updatedCar = await carService.updateCar(id, { name, category, price }, image, user);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: `Car with id ${id} updated successfully`,
                data: updatedCar,
            });
        } else {
            return res.status(400).send({
                code: 400,
                status: "fail",
                message: "Please fill one of the required fields (name, category, price, image)",
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}

export async function deleteCar(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };

    const user = (req as any).user;

    try {
        const car = await carService.getCarById(id);
        if (!car) {
            return res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found',
            });
        } else {
            await carService.deleteCar(id, user);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: `Car with id ${id} deleted successfully`,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}
