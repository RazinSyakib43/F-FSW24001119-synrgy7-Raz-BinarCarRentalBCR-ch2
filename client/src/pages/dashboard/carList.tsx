import SidebarNav from '../../components/dashboard/cars/sidebarNav';
import SectionNavigation from '../../components/dashboard/cars/sectionNavigation';
import CarsListSection from '../../components/dashboard/cars/carsListSection';

import '../../style/dashboard/style.css';

export default function CarList() {
    return (
        <>
            <main>
                <section className="row no-margin-right">
                    <SidebarNav />
                    <SectionNavigation />
                    <CarsListSection />
                </section>
            </main>
        </>
    );
}
