import { useEffect } from 'react';
import { useCarContext } from '../../../context/carContext';
import { useAuth } from '../../../hooks/useAuth';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../../style/dashboard/style.css'

import menuIcon from '../../../assets/icons/dashboard/fi_menu.png';
import userPPIcon from '../../../assets/icons/dashboard/user_pp.png';
import chevronDownIcon from '../../../assets/icons/dashboard/fi_chevron-down.png';
import subTitleIcon from '../../../assets/images/dashboard/Rectangle 9.png';

export default function AllDataListSection(): JSX.Element {
    const { cars, fetchCarsForDashboard } = useCarContext();
    const { userName, userAvatar } = useAuth();

    useEffect(() => {
        if (cars.length === 0) {
            fetchCarsForDashboard();
        }
    }, [cars.length, fetchCarsForDashboard]);

    let number = 1;

    return (
        <section className="col-9 section-car-form" style={{ paddingLeft: 0 }}>
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
                            <li className="breadcrumb-item car-form__breadcrumb-item"><a href="/dashboard/"
                                style={{ color: 'black' }}>Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </section>
                <h2 className="list-car-section__title">Dashboard</h2>
                <section className='d-flex'>
                    <img src={subTitleIcon} alt="" style={{height: '20px', marginRight: '8px'}} />
                    <h3 className='list-car-section__subtitle'>List Car</h3>
                </section>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Rent</th>
                            <th scope="col">Finish Rent</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{number++}</td>
                                <td>{car.manufacture}{" "}{car.model}</td>
                                <td>{car.type}</td>
                                <td>{car.rentPerDay}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{car.createdAt}</td>
                                <td>{car.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
}
