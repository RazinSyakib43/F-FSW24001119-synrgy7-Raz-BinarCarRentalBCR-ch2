import SidebarNav from '../../components/dashboard/addCars/sidebarNav';
import SectionNavigation from '../../components/dashboard/addCars/sectionNavigation';
import CarFormSection from '../../components/dashboard/addCars/carFormSection';

import '../../style/dashboard/style.css';

export default function AddCar() {
    return (
        <>
            <main>
                <section className="row no-margin-right">
                    <SidebarNav />
                    <SectionNavigation />
                    <CarFormSection />
                </section>
            </main>
        </>
    );
}