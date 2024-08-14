import { CarModel } from '../models/carModel';

export class CarRepository {
    async findAll() {
        return await CarModel.query();
    }

    async findSomeCar(title: string) {
        return await CarModel.query().whereRaw('LOWER(manufacture) LIKE ?', [`%${title.toLowerCase()}%`]).orWhereRaw('LOWER(model) LIKE ?', [`%${title.toLowerCase()}%`]);
    }

    async findSomeCarWithStatusActive() {
        return await CarModel.query().where('status', 'active');
    }

    async findById(id: string) {
        return await CarModel.query().findById(id);
    }

    async create(carData: any) {
        return await CarModel.query().insert(carData);
    }

    async update(id: string, carData: any) {
        return await CarModel.query().findById(id).patch(carData);
    }

    async delete(id: string, carData: any) {
        return await CarModel.query().findById(id).patch(carData);
    }
}
