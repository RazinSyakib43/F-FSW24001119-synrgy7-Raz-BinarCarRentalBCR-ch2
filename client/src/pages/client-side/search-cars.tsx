import { useCarContext } from '../../context/carContext';

import Navbar from '../../components/client-side/navbar';
import Hero from '../../components/client-side/cars/hero';
import SearchForm from '../../components/client-side/cars/searchForm';
import CarItem from '../../components/client-side/cars/carCard';
import Footer from '../../components/client-side/footer';

import '../../style/main/style.css'
import '../../style/main/responsive.css'

export default function SearchCarsPage() {
    const { cars } = useCarContext();

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Hero />
                <SearchForm />
                <section className="container">
                    <section className="row row-cols-1 row-cols-md-3">
                        {cars.map(car => (
                            <div className="col mb-4" key={car.id}>
                                <CarItem car={car} />
                            </div>
                        ))}
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}
