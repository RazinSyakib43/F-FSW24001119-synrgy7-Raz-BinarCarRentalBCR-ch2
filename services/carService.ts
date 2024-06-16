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
            start_rent: car.order?.start_rent || null,
            finish_rent: car.order?.finish_rent || null,
            image: car.image,
            status: car.order?.status || null,
            createdAt: car.created_at,
            createdBy: car.created_by,
            updatedAt: car.updated_at,
            updatedBy: car.updated_by,
        };

        if (carItem.status === 'completed' || carItem.status === 'cancelled') {
            carItem.start_rent = null;
            carItem.finish_rent = null;
            carItem.status = null;
        }

        return carItem;
    }

    async getAllCars() {
        const cars = await this.carRepository.findAll();
        return cars.map(car => this.carsData(car));
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

    async deleteCar(id: string) {
        await this.carRepository.delete(id);
    }
}
