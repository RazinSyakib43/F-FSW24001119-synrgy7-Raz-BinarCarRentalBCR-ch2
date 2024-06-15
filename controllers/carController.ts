import { Request, Response } from 'express';

// Car Model
import { CarModel } from '../models/carModel';

import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';

// Get all cars
async function getCars(req: Request, res: Response) {
    try {
        const cars = await CarModel.query().withGraphFetched("order");

        if (cars.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Cars not found'
            });
        } else {
            const carsData = cars.map(carItem => ({
                id: carItem.id,
                name: carItem.name,
                category: carItem.category,
                price: carItem.price,
                start_rent: carItem.order?.start_rent || null,
                finish_rent: carItem.order?.finish_rent || null,
                image: carItem.image,
                status: carItem.order?.status || null,
                createdAt: carItem.created_at,
                createdBy: carItem.created_by,
                updatedAt: carItem.updated_at,
                updatedBy: carItem.updated_by
            }));

            // if status are 'completed' or 'cancelled' then start_rent, finish_rent, status will be null
            carsData.forEach(carItem => {
                if (carItem.status === 'completed' || carItem.status === 'cancelled') {
                    carItem.start_rent = null;
                    carItem.finish_rent = null;
                    carItem.status = null;
                }
            });

            const availableCars = carsData.filter(carItem => carItem.status === null);
            const unavailableCars = carsData.filter(carItem => carItem.status === 'active');

            res.status(200).send({
                code: 200,
                status: 'success',
                data: {
                    availableCars: availableCars,
                    unavailableCars: unavailableCars
                }
            });
        }

        console.log('getCars : ', cars);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function searchCar(req: Request, res: Response) {
    const { title }: { title: string } = req.query as { title: string };

    try {
        const cars = await CarModel.query().where('name', 'like', `%${title}%`).withGraphFetched("order");

        if (cars.length === 0) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found'
            });
        } else {
            const carsData = cars.map(carItem => ({
                id: carItem.id,
                name: carItem.name,
                category: carItem.category,
                price: carItem.price,
                start_rent: carItem.order?.start_rent || null,
                finish_rent: carItem.order?.finish_rent || null,
                image: carItem.image,
                status: carItem.order?.status || null,
                createdAt: carItem.created_at,
                createdBy: carItem.created_by,
                updatedAt: carItem.updated_at,
                updatedBy: carItem.updated_by
            }));

            // if status are 'completed' or 'cancelled' then start_rent, finish_rent, status will be null
            carsData.forEach(carItem => {
                if (carItem.status === 'completed' || carItem.status === 'cancelled') {
                    carItem.start_rent = null;
                    carItem.finish_rent = null;
                    carItem.status = null;
                }
            });

            res.status(200).send({
                code: 200,
                status: 'success',
                data: carsData
            });
        }

        console.log('searchCar : ', cars);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function getCarById(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };

    try {
        const car = await CarModel.query().findById(id).withGraphFetched("order");

        if (!car) {
            res.status(404).send({
                code: 404,
                status: 'fail',
                message: 'Car not found'
            });
        } else {
            const carsData = {
                id: car.id,
                name: car.name,
                category: car.category,
                price: car.price,
                start_rent: car.order?.start_rent || null,
                finish_rent: car.order?.finish_rent || null,
                image: car.image,
                status: car.order?.status || null,
                createdAt: car.created_at,
                createdBy: car.created_by,
                updatedAt: car.updated_at,
                updatedBy: car.updated_by
            };

            // if status are 'completed' or 'cancelled' then start_rent, finish_rent, status will be null
            if (car.order?.status === 'completed' || car.order?.status === 'cancelled') {
                carsData.start_rent = null;
                carsData.finish_rent = null;
                carsData.status = null;
            }

            res.status(200).send({
                code: 200,
                status: 'success',
                data: carsData
            });
        }

        console.log('getCarById : ', car);

    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

async function addCar(req: Request, res: Response) {
    const { name, category, price }: { name: string; category: string; price: number } = req.body;

    const actorRole = (req as any).user.role;
    const actorName = (req as any).user.name;

    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    cloudinary.uploader.upload(file, async function (error: UploadApiErrorResponse, result: UploadApiResponse) {
        try {
            if (!name && !category && !price) {
                res.status(400).send({
                    code: 400,
                    status: "fail",
                    message: "Please fill all required fields (name, category, price)",
                });
            } else if (!name) {
                res.status(400).send({
                    code: 400,
                    status: "fail",
                    message: "Please provide name",
                });
            } else if (!category) {
                res.status(400).send({
                    code: 400,
                    status: "fail",
                    message: "Please provide category",
                });
            } else if (!price) {
                res.status(400).send({
                    code: 400,
                    status: "fail",
                    message: "Please provide price",
                });
            } else {
                const car = await CarModel.query().insert({
                    name: name,
                    category: category,
                    price: price,
                    image: result.secure_url,
                    created_at: new Date(),
                    created_by: actorRole + " - " + actorName,
                    updated_at: new Date(),
                    updated_by: actorRole + " - " + actorName
                });

                const carsData = {
                    id: car.id,
                    name: car.name,
                    category: car.category,
                    price: car.price,
                    image: car.image,
                    createdAt: car.created_at,
                    createdBy: car.created_by,
                    updatedAt: car.updated_at,
                    updatedBy: car.updated_by
                };

                res.status(201).send({
                    code: 201,
                    status: "success",
                    message: "Car added successfully",
                    data: carsData
                });
            }
        } catch (error: any) {
            res.status(500).send({
                code: 500,
                status: 'error',
                message: error.message
            });
        }
    });
}

async function updateCar(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };
    const { name, category, price }: { name?: string; category?: string; price?: number; } = req.body;

    const actorRole = (req as any).user.role;
    const actorName = (req as any).user.name;

    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    try {
        const selectedCar = await CarModel.query().findById(id);
        console.log("selectedCar : ", selectedCar);

        if (!selectedCar) {
            res.status(404).send({
                code: 404,
                status: "fail",
                message: "Car not found",
            });
        } else {
            cloudinary.uploader.upload(file, async function (error: UploadApiErrorResponse, result: UploadApiResponse) {
                const image = req.file ? result.secure_url : selectedCar.image;
                await CarModel.query().findById(id).patch({
                    name: name || selectedCar.name,
                    category: category || selectedCar.category,
                    price: price || selectedCar.price,
                    image: image || selectedCar.image,
                    updated_at: new Date(),
                    updated_by: actorRole + " " + actorName
                });
                res.status(200).send({
                    code: 200,
                    status: "success",
                    message: "Car updated successfully",
                    data: {
                        id: id,
                        name: name || selectedCar.name,
                        category: category || selectedCar.category,
                        price: price || selectedCar.price,
                        image: image || selectedCar.image,
                        createdAt: selectedCar.created_at,
                        createdBy: selectedCar.created_by,
                        updatedAt: new Date(),
                        updatedBy: actorRole + " - " + actorName
                    }
                });
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

async function deleteCar(req: Request, res: Response) {
    const { id }: { id: string } = req.params as { id: string };

    try {
        const findCar = await CarModel.query().findById(id);

        if (!findCar) {
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
                message: 'Car with id ' + id + ' deleted successfully'
            });
        }

        console.log('deleteCar : ', findCar);
    } catch (error: any) {
        res.status(500).send({
            code: 500,
            status: 'error',
            message: error.message
        });
    }
}

export { getCars, searchCar, getCarById, addCar, updateCar, deleteCar };