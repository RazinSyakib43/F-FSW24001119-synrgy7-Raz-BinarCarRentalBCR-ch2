import "bootstrap/dist/css/bootstrap.min.css";

export default function FAQ(): JSX.Element {
    return (
        <article className="faq" id="faq">
            <section className="container">
                <section className="row">
                    <section className="col-lg-5">
                        <h2 className="faq__title">Frequently Asked Question</h2>
                        <p className="faq__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </section>
                    <section className="col-lg-7">
                        <section className="accordion" id="accordionExample">
                            <section className="faq__accordion-item accordion-item">
                                <h2 className="accordion-header">
                                    <button className="faq__accordion-button accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                                        aria-controls="collapseOne">
                                        Apa saja syarat yang dibutuhkan?
                                    </button>
                                </h2>
                                <section id="collapseOne" className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample">
                                    <section className="accordion-body">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem minus neque
                                        alias quos blanditiis,
                                        repudiandae nam exercitationem nemo? Facilis reprehenderit veritatis ab sit
                                        blanditiis minima
                                        pariatur natus deserunt dolor magnam.
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section className="accordion" id="accordionExample">
                            <section className="faq__accordion-item accordion-item">
                                <h2 className="accordion-header">
                                    <button className="faq__accordion-button accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                        Berapa hari minimal sewa mobil lepas kunci?
                                    </button>
                                </h2>
                                <section id="collapseTwo" className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample">
                                    <section className="accordion-body">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem minus neque
                                        alias quos blanditiis,
                                        repudiandae nam exercitationem nemo? Facilis reprehenderit veritatis ab sit
                                        blanditiis minima
                                        pariatur natus deserunt dolor magnam.
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section className="accordion" id="accordionExample">
                            <section className="faq__accordion-item accordion-item">
                                <h2 className="accordion-header">
                                    <button className="faq__accordion-button accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Berapa hari sebelumnya sebaiknya booking sewa mobil?
                                    </button>
                                </h2>
                                <section id="collapseThree" className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample">
                                    <section className="accordion-body">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem minus neque
                                        alias quos
                                        blanditiis, repudiandae nam exercitationem nemo? Facilis reprehenderit veritatis
                                        ab sit blanditiis
                                        minima pariatur natus deserunt dolor magnam.
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section className="accordion" id="accordionExample">
                            <section className="faq__accordion-item accordion-item">
                                <h2 className="accordion-header">
                                    <button className="faq__accordion-button accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                        aria-controls="collapseFour">
                                        Apakah Ada biaya antar-jemput?
                                    </button>
                                </h2>
                                <section id="collapseFour" className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample">
                                    <section className="accordion-body">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem minus neque
                                        alias quos
                                        blanditiis, repudiandae nam exercitationem nemo? Facilis reprehenderit veritatis
                                        ab sit
                                        blanditiis minima pariatur natus deserunt dolor magnam.
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section className="accordion" id="accordionExample">
                            <section className="faq__accordion-item accordion-item">
                                <h2 className="accordion-header">
                                    <button className="faq__accordion-button accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false"
                                        aria-controls="collapseFive">
                                        Bagaimana jika terjadi kecelakaan?
                                    </button>
                                </h2>
                                <section id="collapseFive" className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample">
                                    <section className="accordion-body">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem minus neque
                                        alias quos
                                        blanditiis, repudiandae nam exercitationem nemo? Facilis reprehenderit veritatis
                                        ab sit
                                        blanditiis minima pariatur natus deserunt dolor magnam.
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </article>
    );
}   