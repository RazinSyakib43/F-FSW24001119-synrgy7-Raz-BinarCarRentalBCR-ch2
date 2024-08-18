import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useCarContext } from '../../../context/carContext';
import { useAuth } from '../../../hooks/useAuth';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../../style/dashboard/style.css'

import menuIcon from '../../../assets/icons/dashboard/fi_menu.png';
import userPPIcon from '../../../assets/icons/dashboard/user_pp.png';
import chevronDownIcon from '../../../assets/icons/dashboard/fi_chevron-down.png';

export default function CarFormSection(): JSX.Element {
    const { id } = useParams();
    const { userName, userAvatar } = useAuth();
    const { getCarDetailById, carData, updateCar } = useCarContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getCarDetailById(id);
        }
    }, [id, getCarDetailById]);

    console.log('Car Data:', carData);

    const formik = useFormik({
        initialValues: {
            plate: carData?.plate || '',
            manufacture: carData?.manufacture || '',
            model: carData?.model || '',
            image: null,
            rentPerDay: carData?.rentPerDay || '',
            capacity: carData?.capacity || '',
            description: carData?.description || '',
            driverType: carData?.driverType ? 'true' : 'false',
            transmission: carData?.transmission || '',
            type: carData?.type || '',
            year: carData?.year || '',
            options: carData?.options.join(', ') || '',
            specs: carData?.specs.join(', ') || '',
            createdAt: carData?.createdAt || '',
            updatedAt: carData?.updatedAt || ''
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log('Form Values:', values);
            const carFormData = new FormData();
            carFormData.append('plate', values.plate as string);
            carFormData.append('manufacture', values.manufacture as string);
            carFormData.append('model', values.model as string);
            if (values.image) {
                carFormData.append('image', values.image);
            }
            carFormData.append('rentPerDay', values.rentPerDay as string);
            carFormData.append('capacity', values.capacity as string);
            carFormData.append('description', values.description as string);
            carFormData.append('driverType', values.driverType as string);
            carFormData.append('transmission', values.transmission as string);
            carFormData.append('type', values.type as string);
            carFormData.append('year', values.year as string);
            carFormData.append('options[]', values.options);
            carFormData.append('specs[]', values.specs);

            try {
                await updateCar(id as string, carFormData);
                navigate('/dashboard/cars');
            } catch (error) {
                console.error('Failed to update car:', error);
            }
        }
    });

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
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item car-form__breadcrumb-item"><a href="/dashboard/cars"
                                style={{ color: 'black' }}>Cars</a></li>
                            <li className="breadcrumb-item car-form__breadcrumb-item"><a href="/dashboard/cars"
                                style={{ color: 'black' }}>List Car</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Car</li>
                        </ol>
                    </nav>
                </section>
                <h2 className="car-form__title">Edit Car ({formik.values.manufacture}{" "}{formik.values.model}) </h2>
                <section className="car-form__forms">
                    <form onSubmit={formik.handleSubmit}>
                        {/* Plate */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="plate" className="form-label">Plat Nomor<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="plate"
                                        aria-describedby="plateHelp"
                                        placeholder="Car Plate, ex: AD-3422-A"
                                        name="plate"
                                        value={formik.values.plate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                        </section>
                        {/* Manufacture */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="manufacture" className="form-label">Manufacture<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="manufacture"
                                        aria-describedby="manufactureHelp" placeholder="Car Manufacture, ex: Toyota" name='manufacture' value={formik.values.manufacture}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="manufactureHelp" className="form-text">Contoh: Toyota</section>
                                </section>
                            </section>
                        </section>
                        {/* Model */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="model" className="form-label">Model<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="model"
                                        aria-describedby="modelHelp" placeholder="Car Model, ex: Avanza" name='model' value={formik.values.model}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="modelHelp" className="form-text">Contoh: Avanza</section>
                                </section>
                            </section>
                        </section>
                        {/* Image */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="image" className="form-label">Foto<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={(event) => {
                                            const files = event.currentTarget.files;
                                            if (files !== null) {
                                                formik.setFieldValue('image', files[0]);
                                            }
                                        }}
                                    />
                                </section>
                            </section>
                        </section>
                        {/* Rent Per Day */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="rentPerDay" className="form-label">Rent Per Day<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="rentPerDay"
                                        aria-describedby="rentPerDayHelp" placeholder="Rent Per Day, ex: 400000" name='rentPerDay' value={formik.values.rentPerDay}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="rentPerDayHelp" className="form-text">Contoh: 400000</section>
                                </section>
                            </section>
                        </section>
                        {/* Capacity */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="capacity" className="form-label">Capacity<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="capacity"
                                        aria-describedby="capacityHelp" placeholder="Capacity, ex: 7" name='capacity' value={formik.values.capacity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="capacityHelp" className="form-text">Contoh: 7</section>
                                </section>
                            </section>
                        </section>
                        {/* Description */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="description" className="form-label">Description<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <textarea className="form-control" id="description" rows={4} placeholder="Description" name='description' value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        style={
                                            {
                                                minHeight: '100px'
                                            }
                                        }
                                    ></textarea>
                                </section>
                            </section>
                        </section>
                        {/* Driver Type */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="driverType" className="form-label">Driver Type<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <select className="form-select" aria-label="Default select example"
                                        name="driverType"
                                        value={formik.values.driverType}
                                        onChange={formik.handleChange}>
                                        <option value="">-</option>
                                        <option value="true">With Driver (Dengan Supir)</option>
                                        <option value="false">Without Driver (Lepas kunci)</option>
                                    </select>
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="driverTypeHelp" className="form-text">Contoh: Manual</section>
                                </section>
                            </section>
                        </section>
                        {/* Transmission */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="transmission" className="form-label">Transmission<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <select className="form-select" aria-label="Default select example"
                                        name="transmission"
                                        value={formik.values.transmission}
                                        onChange={formik.handleChange}>
                                        <option value="">-</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="transmissionHelp" className="form-text">Contoh: Automatic</section>
                                </section>
                            </section>
                        </section>
                        {/* Type */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="type" className="form-label">Type<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <select className="form-select" aria-label="Default select example"
                                        name="type"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}>
                                        <option value="">-</option>
                                        <option value="SUV">SUV</option>
                                        <option value="MPV">MPV</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Hatchback">Hatchback</option>
                                    </select>
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="typeHelp" className="form-text">Contoh: SUV</section>
                                </section>
                            </section>
                        </section>
                        {/* Year */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="year" className="form-label">Year<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="year"
                                        aria-describedby="yearHelp" placeholder="Year, ex: 2022" name='year' value={formik.values.year}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="yearHelp" className="form-text">Contoh: 2022</section>
                                </section>
                            </section>
                        </section>
                        {/* Options */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="options" className="form-label">Options<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="options"
                                        aria-describedby="optionsHelp" placeholder="Options, ex: GPS, Airbag" name='options' value={formik.values.options}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="optionsHelp" className="form-text">Contoh: GPS, Airbag</section>
                                </section>
                            </section>
                        </section>
                        {/* Specs */}
                        <section className="mb-3">
                            <section className="row">
                                <section className="col-4 car-form__label">
                                    <label htmlFor="specs" className="form-label">Specs<span
                                        style={{ color: '#EF5A6F' }}>*</span> </label>
                                </section>
                                <section className="col-8">
                                    <input type="text" className="form-control" id="specs"
                                        aria-describedby="specsHelp" placeholder="Specs, ex: 2.0L Engine" name='specs' value={formik.values.specs}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </section>
                            </section>
                            <section className="row">
                                <section className="col-4"></section>
                                <section className="col-8">
                                    <section id="specsHelp" className="form-text">Contoh: 2.0L Engine</section>
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
                                    <p>{new Date(formik.values.createdAt).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                        hour: 'numeric', minute: 'numeric'
                                    })}</p>
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
                                    <p>{new Date(formik.values.updatedAt).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                        hour: 'numeric', minute: 'numeric'
                                    })}</p>
                                </section>
                            </section>
                        </section>
                        {/* Submit */}
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
