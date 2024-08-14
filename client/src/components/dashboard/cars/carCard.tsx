import { Car } from '../../../context/carContext';
import { useCarContext } from '../../../context/carContext';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../../style/dashboard/style.css'

import keyIcon from '../../../assets/icons/dashboard/fi_key.png';
import clockIcon from '../../../assets/icons/dashboard/fi_clock.png';
import trashIcon from '../../../assets/icons/dashboard/fi_trash-2.png';
import editIcon from '../../../assets/icons/dashboard/fi_edit.png';

interface CarItemProps {
    car: Car;
}

export default function CarItem({ car }: CarItemProps): JSX.Element {
    const { deleteCar } = useCarContext();

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${car.manufacture} ${car.model} with id ${car.id}?`)) {
            deleteCar(car.id);
        }
    };

    return (
        <section className="cars-card card px-0">
            <img src={car.image}
                className="cars-card-img" alt={car.manufacture} />
            <section className="cars__card-body card-body">
                <h5 className="cars__name">{car.manufacture}/{car.model}</h5>
                <h3 className="cars__price">Rp {car.rentPerDay} / hari</h3>
                <section className="car__spec">
                    <section className="cars__spec d-flex align-self-center">
                        <img className="cars__spec-icon" src={keyIcon} alt="" />
                        <p className="car__spec-text">Start rent - Finish rent</p>
                    </section>
                    <section className="cars__spec d-flex align-self-center">
                        <img className="cars__spec-icon" src={clockIcon} alt="" />
                        <p className="car__spec-text">Updated at {car.updatedAt}</p>
                    </section>
                </section>
            </section>
            <section className="d-flex">
                <button
                    className="btn cars__button delete-button d-flex justify-content-center"
                    onClick={handleDelete}
                >
                    <img src={trashIcon} alt="" />
                    <p>Delete</p>
                </button>
                <button className="btn cars__button edit-button d-flex justify-content-center">
                    <img src={editIcon} alt="" />
                    <p>Edit</p>
                </button>
            </section>
        </section>
    );
}
