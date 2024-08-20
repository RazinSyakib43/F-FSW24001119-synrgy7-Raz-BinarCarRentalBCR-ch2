import "bootstrap/dist/css/bootstrap.min.css";

import carImage from '../../../assets/images/img_car.png';

export default function Hero(): JSX.Element {
    return (
        <article className="hero" id="hero" style={{ backgroundColor: '#f1f3ff'}}>
            <section className="container">
                <section className="hero__row row">
                    <section className="col-lg-6 col-12 d-flex align-self-center flex-column">
                        <h1 className="hero__title">Sewa & Rental Mobil Terbaik di kawasan Surakarta (Solo)</h1>
                        <p className="hero__description">Selamat datang di Binar Car Rental.
                            Kami menyediakan mobil kualitas terbaik dengan harga terjangkau.
                            Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
                        <a href="/cars" target="_blank">
                            <button type="button" className="btn hero__button">Mulai Sewa Mobil</button>
                        </a>
                    </section>
                    <section className="col-lg-6 col-12" style={{ backgroundColor: "#F1F3FF" }}>
                        <img src={carImage} className="hero__img-car" alt="" />
                    </section>
                </section>
            </section>
        </article>
    );
}
