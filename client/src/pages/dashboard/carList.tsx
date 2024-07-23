import { useEffect } from 'react';
import { useCarContext } from '../../context/carContext';
// import CarItem from '../../components/dashboard/cars/carCard';

export default function CarList() {
    const { cars, fetchCars } = useCarContext();

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    return (
        <section id="main-content__list-car" className="">
            <section id="main-content__path">
                <section className="text-xs mb-6">
                    <span className="font-bold">{"Cars >"}</span>
                    <span className="font-normal"> List Car</span>
                </section>
            </section>
            <section className="flex justify-between">
                <span className="font-bold text-xl">List Car</span>
                <button
                    className="bg-darkblue-04 hover:bg-darkblue-05 rounded-sm py-2 px-3 text-white text-sm font-bold">
                    <i className="bi bi-plus text-xl mr-1"></i>
                    Add New Car
                </button>
            </section>
            <section className="flex gap-4 font-bold text-sm mt-4">
                <button className="hover:border-darkblue-04 hover:bg-darkblue-01 hover:text-darkblue-04 focus:border-darkblue-04 focus:bg-darkblue-01 border border-darkblue-02 focus:text-darkblue-04 text-darkblue-02 py-2 px-3 cursor-pointer">
                    <span>All</span>
                </button>
                <button className="hover:border-darkblue-04 hover:bg-darkblue-01 hover:text-darkblue-04 focus:border-darkblue-04 focus:bg-darkblue-01 border border-darkblue-02 focus:text-darkblue-04 text-darkblue-02 py-2 px-3 cursor-pointer">
                    <span>Available</span>
                </button>
                <button className="hover:border-darkblue-04 hover:bg-darkblue-01 hover:text-darkblue-04 focus:border-darkblue-04 focus:bg-darkblue-01 border border-darkblue-02 focus:text-darkblue-04 text-darkblue-02 py-2 px-3 cursor-pointer" >
                    <span>Unavailable</span>
                </button>
            </section>
            <section className="flex items-center justify-center">
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4" id="cars-container" >
                    {cars.map(car => (
                        <section key={car.id} className="w-[333px] h-[586px] mx-auto p-6">
                            <section className="img-car h-[222px] w-[285px] mb-3" style={{
                                background: `url(${car.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}></section>
                            <p className="font-normal text-sm mb-3">
                                {car.manufacture} {car.model}
                            </p>
                            <p className="font-bold text-base mb-3">
                                Rp {car.rentPerDay} / hari
                            </p>
                            <p className="font-light text-sm mb-3 w-[301px] h-[60px]">
                                {car.description}
                            </p>
                            <ul className="mb-6">
                                <li className="font-light text-sm">
                                    <i className="bi bi-people-fill mr-2"></i>
                                    {car.capacity} orang
                                </li>
                                <li className="font-light text-sm">
                                    <i className="bi bi-gear-fill mr-2"></i>
                                    {car.transmission}
                                </li>
                                <li className="font-light text-sm">
                                    <i className="bi bi-calendar mr-2"></i>Tahun {car.year}
                                </li>
                            </ul>
                            <button className="delete-button border border-alrt-red text-alrt-red hover:bg-alrt-red hover:text-white rounded px-4 py-2 mr-5 mt-5" > Delete
                            </button>
                            <button className="edit-button border border-limegreen-04 text-limegreen-04 hover:bg-limegreen-04 hover:text-white rounded px-4 py-2 mt-5" >
                                Edit
                            </button>
                        </section>
                    ))}
                </section>
            </section>
        </section>
    );
}
