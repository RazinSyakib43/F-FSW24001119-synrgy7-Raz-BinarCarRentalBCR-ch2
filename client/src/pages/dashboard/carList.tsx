import { useEffect } from 'react';
import { useCarContext } from '../../context/carContext';
import CarItem from '../../components/dashboard/cars/carCard';

export default function CarList() {
    const { cars, fetchCars } = useCarContext();

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Car List</h1>
            <div className="grid grid-cols-3 gap-4">
                {cars.map(car => (
                    <div key={car.id} className="col-span-1">
                        <CarItem car={car} />
                    </div>
                ))}
            </div>
        </div>
    );
}
