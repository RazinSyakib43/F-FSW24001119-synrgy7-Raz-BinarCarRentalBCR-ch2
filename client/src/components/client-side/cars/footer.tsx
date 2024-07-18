import "bootstrap/dist/css/bootstrap.min.css";

import facebookIcon from '../../../assets/icons/sosmed/icon_facebook.png';
import instagramIcon from '../../../assets/icons/sosmed/icon_instagram.png';
import twitterIcon from '../../../assets/icons/sosmed/icon_twitter.png';
import mailIcon from '../../../assets/icons/sosmed/icon_mail.png';
import twitchIcon from '../../../assets/icons/sosmed/icon_twitch.png';
import logo from '../../../assets/images/logo.png';

export default function Footer(): JSX.Element {
    return (
        <footer className="footer footer__search-page">
            <section className="container">
                <section className="row">
                    <section className="footer__address col-lg-3">
                        <p className="footer__address-item">Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
                        <p className="footer__address-item">binarcarrental@gmail.com</p>
                        <p className="footer__address-item">081-233-334-808</p>
                    </section>
                    <section className="footer__navigation col-lg-2">
                        <ul>
                            <li><a href="#our-services" className="footer__navigation-link">Our services</a></li>
                            <li><a href="#why-us" className="footer__navigation-link">Why Us</a></li>
                            <li><a href="#testimonial" className="footer__navigation-link">Testimonial</a></li>
                            <li><a href="#faq" className="footer__navigation-link">FAQ</a></li>
                        </ul>
                    </section>
                    <section className="footer__sosmed col-lg-4">
                        <p className="footer__sosmed-title">Connect with us</p>
                        <section className="d-flex">
                            <img className="footer__sosmed-icon" src={facebookIcon} alt="" />
                            <img className=" footer__sosmed-icon" src={instagramIcon} alt="" />
                            <img className="footer__sosmed-icon" src={twitterIcon} alt="" />
                            <img className="footer__sosmed-icon" src={mailIcon} alt="" />
                            <img className="footer__sosmed-icon" src={twitchIcon} alt="" />
                        </section>
                    </section>
                    <section className="footer__copyright col-lg-3">
                        <p className="footer__copyright-title">Copyright Binar 2022</p>
                        <img className="footer__copyright-images" src={logo} alt="" />
                    </section>
                </section>
            </section>
        </footer>
    );
}
