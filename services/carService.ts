import { CarRepository } from '../repositories/carRepository';

import { uploadToCloudinary } from '../utils/uploadUtil';
import { UploadApiResponse } from 'cloudinary';

export class CarService {
    private carRepository: CarRepository;

    constructor() {
        this.carRepository = new CarRepository();
    }

    private carsData(car: any) {
        if (!car) return null;

        const carItem = {
            id: car.id,
            name: car.name,
            category: car.category,
            price: car.price,
            image: car.image,
            createdAt: car.created_at,
            createdBy: car.created_by,
            updatedAt: car.updated_at,
            updatedBy: car.updated_by,
            status: car.status,
            deletedAt: car.deleted_at,
            deletedBy: car.deleted_by,
            orderInfo: {
                startRent: car.order?.start_rent || null,
                finishRent: car.order?.finish_rent || null,
                orderStatus: car.order?.status || null,
            }
        };

        if (carItem.orderInfo.orderStatus === 'completed' || carItem.orderInfo.orderStatus === 'cancelled') {
            carItem.orderInfo.startRent = null;
            carItem.orderInfo.finishRent = null;
            carItem.orderInfo.orderStatus = null;
        }

        return carItem;
    }

    async getAllCars(includeDeleted: boolean = false) {
        const cars = await this.carRepository.findAll();

        if (includeDeleted) {
            return cars.map(car => this.carsData(car));
        } else {
            return cars.filter(car => car.status === 'active').map(car => this.carsData(car));
        }
    }

    async searchCars(title: string) {
        const cars = await this.carRepository.findSomeCar(title);
        return cars.map(car => this.carsData(car));
    }

    async getCarById(id: string) {
        const car = await this.carRepository.findById(id);
        return this.carsData(car);
    }

    async addCar(file: any, carItem: any, user: any) {
        const uploadResult: UploadApiResponse = await uploadToCloudinary(file);

        const actorRole = user.role;
        const actorName = user.name;

        const newCarData = {
            ...carItem,
            image: uploadResult.secure_url,
            created_at: new Date(),
            created_by: `${actorRole} - ${actorName}`,
            updated_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
        };

        const newCar = await this.carRepository.create(newCarData);
        return this.carsData(newCar);
    }

    async updateCar(id: string, carItem: any, file: any, user: any) {
        const selectedCar = await this.carRepository.findById(id);
        console.log("selectedCar", selectedCar);

        const actorRole = user.role;
        const actorName = user.name;

        const oldCarData = {
            name: selectedCar?.name,
            category: selectedCar?.category,
            price: selectedCar?.price,
            image: selectedCar?.image,
        };
        console.log("oldCarData", oldCarData);

        const updatedCarData = {
            name: carItem.name || oldCarData.name,
            category: carItem.category || oldCarData.category,
            price: carItem.price || oldCarData.price,
            image: file ? (await uploadToCloudinary(file)).secure_url : oldCarData.image,
            updated_at: new Date(),
            updated_by: `${actorRole} - ${actorName}`,
        };

        await this.carRepository.update(id, updatedCarData);
        return this.carsData({ ...selectedCar, ...updatedCarData });
    }

    async deleteCar(id: string, user: any) {
        const selectedCar = await this.carRepository.findById(id);
        console.log("selectedCar", selectedCar);

        const actorRole = user.role;
        const actorName = user.name;

        const updatedCarData = {
            status: 'deleted',
            deleted_at: new Date(),
            deleted_by: `${actorRole} - ${actorName}`,
        };

        await this.carRepository.delete(id, updatedCarData);
    }
}
