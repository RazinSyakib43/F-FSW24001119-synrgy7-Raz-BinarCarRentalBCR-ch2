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
            plate: car.plate,
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            rentPerDay: car.rentPerDay,
            capacity: car.capacity,
            description: car.description,
            driverType: car.driverType,
            availableAt: car.availableAt,
            transmission: car.transmission,
            available: car.available,
            type: car.type,
            year: car.year,
            options: car.options,
            specs: car.specs,
            createdAt: car.created_at,
            createdBy: car.created_by,
            updatedAt: car.updated_at,
            updatedBy: car.updated_by,
            status: car.status,
            deletedAt: car.deleted_at,
            deletedBy: car.deleted_by,
        };

        return carItem;
    }

    // client
    async getCars(driverType: boolean) {
        const cars = await this.carRepository.findAll();

        const filteredCars = cars.filter(car => car.driverType === driverType);
        return filteredCars.map(car => this.carsData(car));
    }

    async searchCars(title: string) {
        const cars = await this.carRepository.findSomeCar(title);
        return cars.map(car => this.carsData(car));
    }

    async getCarById(id: string) {
        const car = await this.carRepository.findById(id);
        return this.carsData(car);
    }

    // dashboard
    async getAllCars() {
        const cars = await this.carRepository.findAll();
        return cars.map(car => this.carsData(car));
    }

    async addCar(file: any, carItem: any, user: any) {
        const uploadResult: UploadApiResponse = await uploadToCloudinary(file);

        const actorRole = user.role;
        const actorName = user.name;

        const newCarData = {
            ...carItem,
            image: uploadResult.secure_url,
            available: true,
            availableAt: new Date(),
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
            plate: selectedCar?.plate,
            manufacture: selectedCar?.manufacture,
            model: selectedCar?.model,
            image: selectedCar?.image,
            rentPerDay: selectedCar?.rentPerDay,
            capacity: selectedCar?.capacity,
            description: selectedCar?.description,
            driverType: selectedCar?.driverType,
            availableAt: selectedCar?.availableAt,
            transmission: selectedCar?.transmission,
            available: selectedCar?.available,
            type: selectedCar?.type,
            year: selectedCar?.year,
            options: selectedCar?.options,
            specs: selectedCar?.specs,
        };
        console.log("oldCarData", oldCarData);

        const updatedCarData = {
            plate: carItem.plate || oldCarData.plate,
            manufacture: carItem.manufacture || oldCarData.manufacture,
            model: carItem.model || oldCarData.model,
            image: file ? (await uploadToCloudinary(file)).secure_url : oldCarData.image,
            rentPerDay: carItem.rentPerDay || oldCarData.rentPerDay,
            capacity: carItem.capacity || oldCarData.capacity,
            description: carItem.description || oldCarData.description,
            driverType: carItem.driverType || oldCarData.driverType,
            availableAt: carItem.availableAt || oldCarData.availableAt,
            transmission: carItem.transmission || oldCarData.transmission,
            available: carItem.available || oldCarData.available,
            type: carItem.type || oldCarData.type,
            year: carItem.year || oldCarData.year,
            options: carItem.options || oldCarData.options,
            specs: carItem.specs || oldCarData.specs,
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
