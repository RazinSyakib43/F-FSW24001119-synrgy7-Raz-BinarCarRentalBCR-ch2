/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useCarContext } from '../../../context/carContext';
import { useAuth } from '../../../hooks/useAuth';

import "bootstrap/dist/css/bootstrap.min.css";

import '../../../style/dashboard/style.css'

import menuIcon from '../../../assets/icons/dashboard/fi_menu.png';
import userPPIcon from '../../../assets/icons/dashboard/user_pp.png';
import chevronDownIcon from '../../../assets/icons/dashboard/fi_chevron-down.png';

export default function CarFormSection(): JSX.Element {
    const { userName, userAvatar } = useAuth();
    const { addCar } = useCarContext();

    const [formData, setFormData] = useState({
        plate: '',
        manufacture: '',
        model: '',
        image: null as File | null,
        rentPerDay: '',
        capacity: '',
        description: '',
        driverType: '',
        transmission: '',
        type: '',
        year: '',
        options: '',
        specs: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const carFormData = new FormData();
        carFormData.append('plate', formData.plate);
        carFormData.append('manufacture', formData.manufacture);
        carFormData.append('model', formData.model);
        if (formData.image) {
            carFormData.append('image', formData.image);
        }
        carFormData.append('rentPerDay', formData.rentPerDay);
        carFormData.append('capacity', formData.capacity);
        carFormData.append('description', formData.description);
        carFormData.append('driverType', formData.driverType);
        carFormData.append('transmission', formData.transmission);
        carFormData.append('type', formData.type);
        carFormData.append('year', formData.year);
        carFormData.append('options[]', formData.options);
        carFormData.append('specs[]', formData.specs);

        addCar(carFormData);
    };

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
                    <form onSubmit={handleSubmit}>
                        {/* Plate */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Plat Nomor<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="carPlate"
                                        aria-describedby="plateHelp"
                                        placeholder="Car Plate, ex: AD-3422-A"
                                        name="plate"
                                        value={formData.plate}
                                        onChange={handleInputChange}
                                    />
                                </section>
                            </section>
                        </section>
                        {/* Manufacture */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Manufacture<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Manufacture, ex: Toyota" name='manufacture' value={formData.manufacture}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="emailHelp" className="form-text">Contoh: Toyota</section>
                                </section>
                            </section>
                        </section>
                        {/* Model */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Model<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Model, ex: Avanza" name='model' value={formData.model}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="emailHelp" className="form-text">Contoh: Avanza</section>
                                </section>
                            </section>
                        </section>
                        {/* Image */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Foto<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="file" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Image" name="image"
                                        onChange={handleImageChange} />
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
                        {/* Rent Per Day */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Rent Per Day<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Rent Per Day, ex: 200000" name='rentPerDay' value={formData.rentPerDay}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                        </section>
                        {/* Capacity */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Capacity<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Capacity, ex: 6" name='capacity' value={formData.capacity}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                        </section>
                        {/* Description */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                </section>
                                <section className="col-8">
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
                                        placeholder="Car Description, ex: Lorem Ipsum...." name='description' value={formData.description}
                                        onChange={handleInputChange}></textarea>
                                </section>
                            </section>
                        </section>
                        {/* Driver Type */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Driver Type<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <select className="form-select" aria-label="Default select example" 
                                        name="driverType"
                                        value={formData.driverType}
                                        onChange={handleInputChange}>
                                        <option value="">-</option>
                                        <option value="true">With Driver (Dengan Supir)</option>
                                        <option value="false">Without Driver (Lepas kunci)</option>
                                    </select>
                                </section>
                            </section>
                        </section>
                        {/* Transmission */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Transmission<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <select className="form-select" aria-label="Default select example" 
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleInputChange}>
                                        <option value="">-</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </section>
                            </section>
                        </section>
                        {/* Type */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Type<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <select className="form-select" aria-label="Default select example"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}>
                                        <option value="">-</option>
                                        <option value="SUV">SUV</option>
                                        <option value="MPV">MPV</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Hatchback">Hatchback</option>
                                    </select>
                                </section>
                            </section>
                        </section>
                        {/* Year */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Year<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Year, ex: 2019" name='year' value={formData.year}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                        </section>
                        {/* Options */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Options</label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Options, ex: MP3, GPS, Baby Seat" name='options' value={formData.options}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                        </section>
                        {/* Specs */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Specs</label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Car Specs, ex: NOS, 4 Doors, 4 Seats" name='specs' value={formData.specs}
                                        onChange={handleInputChange} />
                                </section>
                            </section>
                        </section>

                        {/* Start Rent */}
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
                        {/* Finish Rent */}
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
                        {/* Created At */}
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
                        {/* Updated At */}
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
