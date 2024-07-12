import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Car {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    rentPerDay: number;
    capacity: number;
    description: string;
    driverType: boolean;
    availableAt: string;
    transmission: string;
    available: boolean;
    type: string;
    year: number;
    options: string[];
    specs: string[];
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    status: string;
    deletedAt: string | null;
    deletedBy: string | null;
}

interface CarContextProps {
    cars: Car[];
    fetchCars: () => void;
    addCar: (car: Car) => void;
    updateCar: (car: Car) => void;
    deleteCar: (id: string) => void;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export function CarProvider({ children }: { children: React.ReactNode }) {
    const [cars, setCars] = useState<Car[]>([]);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/dashboard/cars');
            console.log('Fetched cars:', response.data.data);
            setCars(response.data.data);
        } catch (error) {
            console.error('Failed to fetch cars', error);
        }
    };

    const addCar = async (car: Car) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/dashboard/cars', car);
            setCars([...cars, response.data.data]);
        } catch (error) {
            console.error('Failed to add car', error);
        }
    };

    const updateCar = async (car: Car) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/dashboard/cars/${car.id}`, car);
            setCars(cars.map(c => (c.id === car.id ? response.data.data : c)));
        } catch (error) {
            console.error('Failed to update car', error);
        }
    };

    const deleteCar = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/dashboard/cars/${id}`);
            setCars(cars.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete car', error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <CarContext.Provider value={{ cars, fetchCars, addCar, updateCar, deleteCar }}>
            {children}
        </CarContext.Provider>
    );
}

export function useCarContext() {
    const context = React.useContext(CarContext);
    if (!context) {
        throw new Error('useCarContext must be used within a CarProvider');
    }
    return context;
}
