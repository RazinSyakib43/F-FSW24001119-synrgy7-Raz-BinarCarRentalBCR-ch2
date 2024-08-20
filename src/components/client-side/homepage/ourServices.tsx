import "bootstrap/dist/css/bootstrap.min.css";

import serviceImage from '../../../assets/images/img_service.png';

import checkIcon from '../../../assets/icons/icon_check.png';

export default function OurServices(): JSX.Element {
    return (
        <article className="our-services" id="our-services">
            <section className="container">
                <section className="our-services__row row">
                    <section className="our-services__col1 col-lg-6 col-12">
                        <img src={serviceImage} className="our-services__img" alt="" />
                    </section>
                    <section className="col-lg-6 col-12 d-flex flex-column align-self-center">
                        <h2 className="our-services__title">Best Car Rental for any kind of trip in Surakarta (Solo)!</h2>
                        <p className="our-services__description">Sewa mobil di Surakarta (Solo) bersama Binar Car Rental
                            jaminan harga
                            lebih murah dibandingkan yang lain,
                            kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
                            wedding, meeting,
                            dll.</p>
                        <section className="our-services__list">
                            <section className="our-services__list-item d-flex align-self-center">
                                <img className="our-services__list-item__check" src={checkIcon} alt="" />
                                <p className="our-services__list-item-text">Sewa Mobil Dengan Supir di Bali 12 Jam</p>
                            </section>
                            <section className="our-services__list-item d-flex align-self-center">
                                <img className="our-services__list-item__check" src={checkIcon} alt="" />
                                <p className="our-services__list-item-text">Sewa Mobil Lepas Kunci di Bali 24 Jam</p>
                            </section>
                            <section className="our-services__list-item d-flex align-self-center">
                                <img className="our-services__list-item__check" src={checkIcon} alt="" />
                                <p className="our-services__list-item-text">Sewa Mobil Jangka Panjang Bulanan</p>
                            </section>
                            <section className="our-services__list-item d-flex align-self-center">
                                <img className="our-services__list-item__check" src={checkIcon} alt="" />
                                <p className="our-services__list-item-text">Gratis Antar - Jemput Mobil di Bandara</p>
                            </section>
                            <section className="our-services__list-item d-flex align-self-center">
                                <img className="our-services__list-item__check" src={checkIcon} alt="" />
                                <p className="our-services__list-item-text">Layanan Airport Transfer / Drop In Out</p>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </article>);
}