import SidebarNav from '../../components/dashboard/dashboardMain/sidebarNav';
import SectionNavigation from '../../components/dashboard/dashboardMain/sectionNavigation';
import AllDataListSection from '../../components/dashboard/dashboardMain/allDataListSection';

import '../../style/dashboard/style.css';

export default function DashboardPage() {
    return (
        <>
            <main>
                <section className="row no-margin-right">
                    <SidebarNav />
                    <SectionNavigation />
                    <AllDataListSection />
                </section>
            </main>
        </>
    );
}
