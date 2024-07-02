import { CarModel } from '../models/carModel';

export class CarRepository {
    async findAll() {
        return await CarModel.query().withGraphFetched("order");
    }

    async findSomeCar(title: string) {
        return await CarModel.query().where('name', 'like', `%${title}%`).withGraphFetched("order");
    }

    async findById(id: string) {
        return await CarModel.query().findById(id).withGraphFetched("order");
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
