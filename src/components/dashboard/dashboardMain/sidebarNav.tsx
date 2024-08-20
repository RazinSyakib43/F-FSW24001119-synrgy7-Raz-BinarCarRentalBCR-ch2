import "bootstrap/dist/css/bootstrap.min.css";

import '../../../style/dashboard/style.css'

import logo from '../../../assets/icons/dashboard/Rectangle 63.png';
import homeIcon from '../../../assets/icons/dashboard/fi_home.png';
import truckIcon from '../../../assets/icons/dashboard/fi_truck.png';

export default function SidebarNav(): JSX.Element {
    return (
        <section className="col-1 sidebar-nav">
            <section className="sidebar-nav__logo">
                <img src={logo} alt="" />
            </section>
            <a href="/dashboard">
                <section className="sidebar-nav__button sidebar-nav__button-active">
                    <img src={homeIcon} style={{ height: '24px', width: '24px' }} alt="" />
                    <p className="sidebar-nav__button-text">Dashboard</p>
                </section>
            </a>
            <a href="/dashboard/cars">
                <section className="sidebar-nav__button">
                    <img src={truckIcon} style={{ height: '24px', width: '24px' }} alt="" />
                    <p className="sidebar-nav__button-text">Cars</p>
                </section>
            </a>
        </section>
    );
}
