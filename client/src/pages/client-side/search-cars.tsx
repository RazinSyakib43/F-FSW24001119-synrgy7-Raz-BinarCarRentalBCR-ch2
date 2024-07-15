import { useCarContext } from '../../context/carContext';
import CarItem from '../../components/client-side/cars/carCard';
import SearchForm from '../../components/client-side/cars/searchCarForm';

import '../../style/main/style.css'
import '../../style/main/responsive.css'

export default function SearchCarsPage() {
    const { cars } = useCarContext();

    return (
        <section className="container">
            <SearchForm />
            <section id="cars-container" className="row row-cols-1 row-cols-md-3">
                {cars.map(car => (
                    <div className="col mb-4" key={car.id}>
                        <CarItem car={car} />
                    </div>
                ))}
            </section>
        </section>
    );
}
