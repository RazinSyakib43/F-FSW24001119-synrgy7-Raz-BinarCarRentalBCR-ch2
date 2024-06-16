import { Request, Response } from 'express';
import { CarService } from '../services/carService';

const carService = new CarService();

export async function getCars(req: Request, res: Response) {
    try {
        const cars = await carService.getAllCars();
        res.status(200).send({
            code: 200,
            status: 'success',
            data: cars,
        });
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
        res.status(200).send({
            code: 200,
            status: 'success',
            data: cars,
        });
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
    const file: Express.Multer.File = req.file as Express.Multer.File;
    const user = (req as any).user;

    try {
        if (!name || !category || !price) {
            return res.status(400).send({
                code: 400,
                status: "fail",
                message: "Please fill all required fields (name, category, price)",
            });
        }

        const newCar = await carService.addCar({ name, category, price }, file, user);
        res.status(201).send({
            code: 201,
            status: "success",
            message: "Car added successfully",
            data: newCar,
        });
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
    const { name, category, price }: { name?: string; category?: string; price?: number; } = req.body;
    const file: Express.Multer.File = req.file as Express.Multer.File;
    const user = (req as any).user;

    try {
        const updatedCar = await carService.updateCar(id, { name, category, price }, file, user);
        if (!updatedCar) {
            return res.status(404).send({
                code: 404,
                status: "fail",
                message: "Car not found",
            });
        }

        res.status(200).send({
            code: 200,
            status: "success",
            message: "Car updated successfully",
            data: updatedCar,
        });
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

    try {
        const car = await carService.getCarById(id);
        if (!car) {
            return res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found',
            });
        }

        await carService.deleteCar(id);
        res.status(200).send({
            code: 200,
            status: 'success',
            message: `Car with id ${id} deleted successfully`,
        });
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message,
        });
    }
}
