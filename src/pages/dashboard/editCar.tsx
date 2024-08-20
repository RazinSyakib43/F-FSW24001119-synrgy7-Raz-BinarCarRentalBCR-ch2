import SidebarNav from '../../components/dashboard/editCars/sidebarNav';
import SectionNavigation from '../../components/dashboard/editCars/sectionNavigation';
import CarFormSection from '../../components/dashboard/editCars/carFormSection';

import '../../style/dashboard/style.css';

export default function EditCar() {
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