import "bootstrap/dist/css/bootstrap.min.css";

import '../../../style/dashboard/style.css'

export default function CarFormSection(): JSX.Element {
    return (
        <section className="col-9 section-car-form" style={{ paddingLeft: 0 }}>
            <section className="top-navbar d-flex justify-content-between">
                <img src="../../assets/icons/dashboard/fi_menu.png" className="top-navbar__hamburger" alt="" />
                <section className="d-flex">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <section className="d-flex align-items-center" style={{ marginLeft: '24px' }}>
                        <img src="../../assets/icons/dashboard/user_pp.png" className="top-navbar__user-picture" alt="" />
                        <p className="top-navbar__username">RazinSyakib</p>
                        <img src="../../assets/icons/dashboard/fi_chevron-down.png" className="top-navbar__dropdown" alt="" />
                    </section>
                </section>
            </section>
            <section className="car-form">
                <section className="car-form__breadcrumb">
                    <nav aria-label="breadcrumb">
                        {/* style={{ "--bs-breadcrumb-sectionider": ">" }} */}
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item car-form__breadcrumb-item"><a href="/dashboard/cars"
                                style={{ color: 'black' }}>Cars</a></li>
                            <li className="breadcrumb-item car-form__breadcrumb-item"><a href="/dashboard/cars"
                                style={{ color: 'black' }}>List Car</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Add New Car</li>
                        </ol>
                    </nav>
                </section>
                <h2 className="car-form__title">Add New Car</h2>
                <section className="car-form__forms">
                    <form>
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Nama<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car name" />
                                </section>
                            </section>
                        </section>
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Harga<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Price" />
                                </section>
                            </section>
                        </section>
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Foto<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="file" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Image" />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="emailHelp" className="form-text">File size max.
                                        2MB</section>
                                </section>
                            </section>
                        </section>

                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Start
                                        Rent</label>
                                </section>
                                <section className="col-8">
                                    <p>-</p>
                                </section>
                            </section>
                        </section>
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Finish
                                        Rent</label>
                                </section>
                                <section className="col-8">
                                    <p>-</p>
                                </section>
                            </section>
                        </section>
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Created
                                        at</label>
                                </section>
                                <section className="col-8">
                                    <p>-</p>
                                </section>
                            </section>
                        </section>
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Updated
                                        at</label>
                                </section>
                                <section className="col-8">
                                    <p>-</p>
                                </section>
                            </section>
                        </section>
                        <section className="car-form__button">
                            <button type="submit" className="btn btn-primary car-form__cancel-button">Cancel</button>
                            <button type="submit" className="btn btn-primary car-form__submit-button">Save</button>
                        </section>
                    </form>
                </section>
            </section>
        </section>
    );
}
