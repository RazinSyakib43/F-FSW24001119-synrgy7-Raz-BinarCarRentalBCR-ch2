import "bootstrap/dist/css/bootstrap.min.css";

import '../../../style/dashboard/style.css'

import logo from '../../../assets/icons/dashboard/Rectangle 62.png';

export default function SectionNavigation(): JSX.Element {
    return (
        <section className="col-2 section-navigation" style={{ paddingRight: 0 }}>
            <section className="section-navigation__logo">
                <img src={logo} alt=""/>
            </section>
            <h2 className="section-navigation__title">CARS</h2>
            <section className="section-navigation__list">
                <ul className="list-group list-group-flush">
                    <a href="/dashboard/cars">
                        <li className="list-group-item section-navigation__list-item">
                            <p>List Car</p>
                        </li>
                    </a>
                </ul>
            </section>
        </section>
    );
}
