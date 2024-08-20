import "bootstrap/dist/css/bootstrap.min.css";

import logo from '../../assets/images/logo.png';

export default function Navbar(): JSX.Element {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f1f3ff' }}>
            <section className="container navbar__container">
                    <img src={logo} className="navbar-brand" alt=""/>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <section className="offcanvas w-50 offcanvas-end" id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel">
                            <section className="offcanvas-header">
                                <a href="#hero">
                                    <h5 className="offcanvas-title navbar__responsive-title" id="offcanvasNavbarLabel">
                                        BCR
                                    </h5>
                                </a>
                                <button type="button" className="btn-close navbar__responsive-close-button"
                                    data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </section>
                            <section className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link text-dark navbar__text-button" href="#our-services">Our Services</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark navbar__text-button" href="#why-us">Why Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark navbar__text-button" href="#testimonial">Testimonial</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark navbar__text-button" href="#faq">FAQ</a>
                                    </li>
                                </ul>
                                <button type="button" className="btn navbar__register-button">Register</button>
                            </section>
                        </section>
                </section>
            </nav>
    );
}
