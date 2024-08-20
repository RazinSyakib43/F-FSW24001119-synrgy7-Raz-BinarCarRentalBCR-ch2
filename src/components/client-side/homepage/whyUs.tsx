import "bootstrap/dist/css/bootstrap.min.css";

import completeIcon from '../../../assets/icons/why-us/icon_complete.png';
import priceIcon from '../../../assets/icons/why-us/icon_price.png';
import hrsIcon from '../../../assets/icons/why-us/icon_24hrs.png';
import professionalIcon from '../../../assets/icons/why-us/icon_professional.png';

export default function WhyUs(): JSX.Element {
    return (
        <article className="why-us" id="why-us">
            <section className="container">
                <h2 className="why-us__title">Why Us</h2>
                <p className="why-us__description">Mengapa harus pilih Binar Car Rental?</p>
                <section className="why-us__row row">
                    <section className="col-lg-3 col-12">
                        <section className="why-us__card card">
                            <img src={completeIcon} className="why-us__card-icon card-img-top" alt="..."/>
                                <section className="why-us__card-body  card-body px-0">
                                    <h3 className="card-title">Mobil Lengkap</h3>
                                    <p className="card-text">Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan
                                        terawat</p>
                                </section>
                        </section>
                    </section>
                    <section className="col-lg-3 col-12">
                        <section className="why-us__card card">
                            <img src={priceIcon} className="why-us__card-icon card-img-top" alt="..."/>
                                <section className="why-us__card-body card-body px-0">
                                    <h3 className="card-title">Harga Murah</h3>
                                    <p className="card-text">Harga murah dan bersaing, bisa bandingkan harga kami dengan rental
                                        mobil lain</p>
                                </section>
                        </section>
                    </section>
                    <section className="col-lg-3 col-12">
                        <section className="why-us__card card">
                            <img src={hrsIcon} className="why-us__card-icon card-img-top" alt="..."/>
                                <section className="why-us__card-body  card-body px-0">
                                    <h3 className="card-title">Layanan 24 Jam</h3>
                                    <p className="card-text">Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga
                                        tersedia di akhir
                                        minggu</p>
                                </section>
                        </section>
                    </section>
                    <section className="col-lg-3 col-12">
                        <section className="why-us__card card">
                            <img src={professionalIcon} className="why-us__card-icon card-img-top" alt="..."/>
                                <section className="why-us__card-body  card-body px-0">
                                    <h3 className="card-title">Sopir Profesional</h3>
                                    <p className="card-text">Sopir yang profesional, berpengalaman, jujur, ramah dan selalu
                                        tepat waktu</p>
                                </section>
                        </section>
                    </section>
                </section>
            </section>
        </article>
    );
}   