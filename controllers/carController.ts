import { Request, Response } from 'express';

// Car Model
import { CarModel } from '../models/carModel';

import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';

// Get all cars
async function getCars(req: Request, res: Response, error: any) {
    try {
        const cars = await CarModel.query();
        res.status(200).send({
            code: 200,
            status: 'success',
            data: cars
        });

        if (cars.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Cars not found'
            });
        }

        console.log('getCars : ', cars);
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: "Internal Server Error"
        });
    }
}

async function searchCar(req: Request, res: Response, error: any) {
    const { title }: { title: string } = req.query as { title: string };

    try {
        const Cars = await CarModel.query().findOne({ title: title });
        res.status(200).send({
            code: 200,
            status: 'success',
            data: Cars
        });

        if (!title) {
            res.status(400).send({
                code: 400,
                status: 'fail',
                message: 'Please provide a title'
            });
        }
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: "Internal Server Error"
        });
    }
}

async function getCarById(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };

    try {
        const car = await CarModel.query().findById(id);

        if (!car || isNaN(parseInt(id)) || car.id.toString() !== id) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found'
            });
        } else {
            res.status(200).send({
                code: 200,
                status: 'success',
                data: car
            });
        }

        console.log('getCarById : ', car);
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: "Internal Server Error"
        });
    }
}

async function addCar(req: Request, res: Response) {
    const { name, category, price }: { name: string; category: string; price: number } = req.body;

    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    cloudinary.uploader.upload(file, async function (error: any, result: any) {
        if (error) {
            res.status(400).send({
                code: 400,
                status: "fail",
                message: error.message,
            });
        } else if (!name || !category || !price) {
            res.status(400).send({
                code: 400,
                status: "fail",
                message: "Please fill all required fields",
            });
        }

        try {
            const car = await CarModel.query().insert({
                name: name,
                category: category,
                price: price,
                image: result.secure_url
            });

            res.status(201).send({
                code: 201,
                status: "success",
                message: "Book added successfully",
                data: car,
            });
        } catch (error) {
            res.status(500).send({
                code: 500,
                status: 'error',
                message: "Internal Server Error"
            });
        }
    });
}

async function updateCar(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };
    const { name, category, price }: { name?: string; category?: string; price?: number; } = req.body;

    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    const selectedCar = await CarModel.query().findById(id);
    console.log("selectedCar", selectedCar);

    cloudinary.uploader.upload(file, async function (result: UploadApiResponse) {
        try {
            const car = await CarModel.query().findById(id).patch({
                name: name || selectedCar?.name,
                category: category || selectedCar?.category,
                price: price || selectedCar?.price,
                image: result.secure_url || selectedCar?.image || "",
                created_at: selectedCar?.created_at,
                updated_at: new Date().toISOString()
            });

            res.status(201).send({
                code: 201,
                status: "success",
                message: "Book updated successfully",
                data: car,
            });
        } catch (error) {
            res.status(500).send({
                code: 500,
                status: 'error',
                message: "Internal Server Error"
            });
        }
    });
}

async function deleteCar(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };

    try {
        const findCar = await CarModel.query().findById(id);
        if (!findCar || isNaN(parseInt(id)) || findCar.id.toString() !== id) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found'
            });
        } else {
            await CarModel.query().deleteById(id);
            res.status(200).send({
                code: 200,
                status: 'success',
                message: 'Car deleted successfully'
            });
        }

        console.log('deleteCar : ', findCar);
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: "Internal Server Error"
        });
    }
}

export { getCars, searchCar, getCarById, addCar, updateCar, deleteCar };