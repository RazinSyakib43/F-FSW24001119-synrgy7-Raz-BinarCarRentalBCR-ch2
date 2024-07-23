import { Car } from '../../../context/carContext';

import '../../../style/dashboard/style.css'

interface CarItemProps {
    car: Car;
}

export default function CarItem({ car }: CarItemProps): JSX.Element {
    return (
        <section className="cars-card card px-0">
            <img src={car.image} className="cars-card-img object-cover" alt={car.manufacture} />
            <section className="cars__card-body card-body">
                <h5 className="cars__name">{car.manufacture}/{car.model}</h5>
                <h3 className="cars__price">Rp {car.rentPerDay} / hari</h3>
                <p className="cars__description">{car.description}</p>
                <section className="car__spec grid grid-cols-3 gap-4">
                    <section className="cars__spec flex items-center">
                        <img className="cars__spec-icon" src="./assets/icons/cars/fi_users.png" alt="" />
                        <p className="car__spec-text">{car.capacity} orang</p>
                    </section>
                    <section className="cars__spec flex items-center">
                        <img className="cars__spec-icon" src="./assets/icons/cars/fi_settings.png" alt="" />
                        <p className="car__spec-text">{car.transmission}</p>
                    </section>
                    <section className="cars__spec flex items-center">
                        <img className="cars__spec-icon" src="./assets/icons/cars/fi_calendar.png" alt="" />
                        <p className="car__spec-text">Tahun {car.year}</p>
                    </section>
                </section>
            </section>
            <button className="btn cars__button">Pilih Mobil</button>
        </section>
    );
}
