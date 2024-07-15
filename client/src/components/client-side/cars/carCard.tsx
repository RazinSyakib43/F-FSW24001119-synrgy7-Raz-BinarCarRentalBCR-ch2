import { Car } from '../../../context/carContext';

interface CarItemProps {
    car: Car;
}

export default function CarItem({ car }: CarItemProps): JSX.Element {
    return (
        <div className="card">
            <img src={car.image} className="card-img-top" alt={car.model} />
            <div className="card-body">
                <h5 className="card-title">{car.manufacture} {car.model}</h5>
                <p className="card-text">{car.description}</p>
                <p className="card-text">Rent per day: {car.rentPerDay}</p>
                <p className="card-text">Driver type: {car.driverType ? "Dengan Supir" : "Lepas kunci"}</p>
            </div>
        </div>
    );
}
