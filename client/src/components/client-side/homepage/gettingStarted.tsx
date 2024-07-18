import "bootstrap/dist/css/bootstrap.min.css";

export default function GettingStarted(): JSX.Element {
    return (
        <article className="getting-started" id="getting-started">
            <section className="container">
                <section className="getting-started__card card d-flex flex-column align-items-center">
                    <section className="getting-started__card-body card-body d-flex align-items-center flex-column">
                        <h2 className="getting-started__title card-title text-center">Sewa Mobil di Surakarta (Solo)
                            Sekarang</h2>
                        <section>
                            <p className="getting-started__description card-text text-center">Lorem ipsum dolor sit amet,
                                consectetur
                                adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </section>
                        <a href="/cars" target="_blank">
                            <button type="button" className="getting-started__button btn">Mulai Sewa Mobil</button>
                        </a>
                    </section>
                </section>
            </section>
        </article>
    );
}   