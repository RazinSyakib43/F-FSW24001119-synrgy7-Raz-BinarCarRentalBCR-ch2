/* eslint-disable @typescript-eslint/no-explicit-any */
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
    [key: string]: any;
}

interface CarContextProps {
    cars: Car[];
    carData: Car | null;

    searchCars: (driverType: string, capacity: string) => void;

    fetchCarsForDashboard: () => void;
    getCarDetailById: (id: string) => void;
    addCar: (formData: FormData) => void;
    updateCar: (id: string, formData: FormData) => void;
    deleteCar: (id: string) => void;
}

export const CarContext = createContext<CarContextProps | undefined>(undefined);

export function CarProvider({ children }: { children: React.ReactNode }) {
    const [cars, setCars] = useState<Car[]>([]);
    const [carData, setCarData] = useState<Car | null>(null);

    // Client
    const searchCars = async (driverType: string, capacity: string) => {
        try {
            const response = await axios.get(`https://yawning-unicorn-zeens-ed02ad15.koyeb.app/api/v1/client/cars`, {
                params: { driverType, capacity }
            });
            setCars(response.data.data);
            console.log("searchCars:", response.data.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    // dashboard
    const fetchCarsForDashboard = async () => {
        try {
            const response = await axios.get('https://yawning-unicorn-zeens-ed02ad15.koyeb.app/api/v1/dashboard/cars/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCars(response.data.data);
            console.log("fetchCarsForDashboard:", response.data.data);
        } catch (error) {
            console.error('Failed to fetch cars', error);
        }
    };

    const getCarDetailById = async (id: string) => {
        try {
            const response = await axios.get(`https://yawning-unicorn-zeens-ed02ad15.koyeb.app/api/v1/dashboard/cars/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const carDetail: Car = response.data.data;
            setCarData(carDetail);
            console.log("getCarDetailById:", carDetail);
        } catch (error) {
            console.error('Failed to fetch car detail', error);
        }
    };

    const addCar = async (formData: FormData) => {
        try {
            const response = await axios.post('https://yawning-unicorn-zeens-ed02ad15.koyeb.app/api/v1/dashboard/cars', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setCars([...cars, response.data.data]);
            const token = localStorage.getItem('token');
            console.log(token);
            console.log("Add car", response.data.data);
        } catch (error) {
            console.error('Failed to add car', error);
        }
    };


    const updateCar = async (id: string, formData: FormData) => {
        try {
            const response = await axios.put(`https://yawning-unicorn-zeens-ed02ad15.koyeb.app/api/v1/dashboard/cars/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Update car", response.data.data);
            setCars(cars.map(c => c.id === id ? response.data.data : c));
        } catch (error) {
            console.error('Failed to update car', error);
        }
    };

    const deleteCar = async (id: string) => {
        try {
            const response = await axios.delete(`https://yawning-unicorn-zeens-ed02ad15.koyeb.app/api/v1/dashboard/cars/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
                }
            });
            console.log("Delete car", response.data.data);
            setCars(cars.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete car', error);
        }
    };

    useEffect(() => {
        searchCars('','');
    }, []);

    return (
        <CarContext.Provider value={{
            cars,
            carData,
            searchCars,

            fetchCarsForDashboard,
            getCarDetailById,
            addCar,
            updateCar,
            deleteCar
        }}> {children}
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
