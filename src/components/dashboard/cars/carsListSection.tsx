import { useState, useEffect } from 'react';
import { useCarContext } from '../../../context/carContext';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../../style/dashboard/style.css'

import CarItem from './carCard';

import menuIcon from '../../../assets/icons/dashboard/fi_menu.png';
import userPPIcon from '../../../assets/icons/dashboard/user_pp.png';
import chevronDownIcon from '../../../assets/icons/dashboard/fi_chevron-down.png';

export default function CarsListSection(): JSX.Element {
    const { cars, fetchCarsForDashboard } = useCarContext();
    const { userName, userAvatar } = useAuth();
    const location = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalBgColor, setmodalBgColor] = useState('');
    const [modalTextColor, setModalTextColor] = useState('');

    useEffect(() => {
        if (cars.length === 0) {
            fetchCarsForDashboard();
        }

        if (location.state && location.state.showSuccessModal) {
            setModalMessage(location.state.message || "Aksi berhasil");
            setmodalBgColor(location.state.modalBgColor || 'white');
            setModalTextColor(location.state.modalTextColor || 'black');
            setShowModal(true);

            const timer = setTimeout(() => {
                console.log("Modal is being closed");
                setShowModal(false);
            }, 3000);

            window.history.replaceState({}, document.title);

            return () => {
                console.log("Clearing timeout");
                clearTimeout(timer);
            };
        } else {
            console.log("Modal should not be shown");
            setShowModal(false);
        }
    }, [cars.length, fetchCarsForDashboard, location.state]);


    return (
        <section className="col-9 section-car-form" style={{ paddingLeft: 0 }}>
            {showModal && (
                <div className="modal" tabIndex={-1} style={{display: 'block'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modalNotification modal-body" style={{ backgroundColor: modalBgColor }}>
                                <p className='modalText' style={{ color: modalTextColor }}>{modalMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="top-navbar d-flex justify-content-between">
                <img src={menuIcon} className="top-navbar__hamburger" alt="" />
                <section className="d-flex">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <section className="d-flex align-items-center" style={{ marginLeft: '24px' }}>
                        <img src={userAvatar || userPPIcon} className="top-navbar__user-picture" alt="" />
                        <p className="top-navbar__username">{userName || 'User'}</p>
                        <img src={chevronDownIcon} className="top-navbar__dropdown"
                            alt="" />
                    </section>
                </section>
            </section>
            <section className="list-car-section">
                <section className="car-form__breadcrumb">
                    <nav aria-label="breadcrumb">
                        {/* style="--bs-breadcrumb-sectionider: '>';" */}
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item car-form__breadcrumb-item"><a href="/dashboard/cars"
                                style={{ color: 'black' }}>Cars</a></li>
                            <li className="breadcrumb-item active" aria-current="page">List Car</li>
                        </ol>
                    </nav>
                </section>
                <section className="d-flex justify-content-between">
                    <h2 className="list-car-section__title">List Car</h2>
                    <a href="/dashboard/cars/add-car">
                        <button type="button" className="btn btn-primary add-new-car-button"><span
                            style={{ marginRight: '12px' }}>+</span>Add
                            New Car</button>
                    </a>
                </section>

                <section className=" d-flex" style={{ marginBottom: '24px' }}>
                    <button type="button"
                        className="btn btn-primary list-car-section__filter-button list-car-section__filter-button-active">All</button>
                    <button type="button" className="btn btn-primary list-car-section__filter-button">Small</button>
                    <button type="button" className="btn btn-primary list-car-section__filter-button">Medium</button>
                    <button type="button" className="btn btn-primary list-car-section__filter-button">Large</button>
                </section>

                <section className="row row-cols-3">
                    {cars.map(car => (
                        <section className="col mb-4" key={car.id}>
                            <CarItem car={car} />
                        </section>
                    ))}
                </section>
            </section>
        </section>
    );
}
