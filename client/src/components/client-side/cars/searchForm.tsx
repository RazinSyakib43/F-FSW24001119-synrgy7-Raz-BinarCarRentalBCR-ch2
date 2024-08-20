import React, { useState, useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { CarContext } from '../../../context/carContext';

export default function SearchForm() {
    const [driverType, setDriverType] = useState('');
    const [capacity, setCapacity] = useState('');
    const carContext = useContext(CarContext);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (carContext) {
            carContext.searchCars(driverType, capacity);
        }
        
        const driverTypeValue = (document.getElementById('tipe_driver__form') as HTMLSelectElement).value;
        console.log("driverTypeValue:", driverTypeValue);

        const dateValue = (document.getElementById('date') as HTMLInputElement).value;
        console.log("dateValue:", dateValue);
    };

    return (
        <article id="search">
            <form name="search_form" className="search" onSubmit={handleSearch}>
                <section className="tipe_driver">
                    <p className="tipe_driver__title">Tipe Driver</p>
                    <select className="form-select h-75" name="tipe_driver__form" id="tipe_driver__form" value={driverType} onChange={(e) => setDriverType(e.target.value)}>
                        <option value="">Pilih Driver</option>
                        <option value="true">Dengan Supir</option>
                        <option value="false">Lepas kunci</option>
                    </select>
                </section>
                <section className="pilih-tanggal">
                    <p className="pilih-tanggal__title">Tanggal</p>
                    <input type="date" className="form-control h-75" placeholder="Pilih Tanggal" name="pilih_tanggal__form" id="date" />
                </section>
                <section className="waktu_jemput">
                    <p className="waktu_jemput__title">Waktu Jemput/Ambil</p>
                    <input type="time" className="form-control h-75" placeholder="Pilih Waktu" name="waktu_jemput__form" id="time" />
                </section>
                <section className="jumlah_penumpang">
                    <p className="jumlah_penumpang__title">Jumlah Penumpang (Optional)</p>
                    <input type="text" className="form-control h-75" placeholder="Jumlah Penumpang" name="jumlah_penumpang__form" id="qty" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                </section>
                <section className="search__bar">
                    <p className="jumlah_penumpang__title" style={{ color: 'transparent' }}>P</p>
                    <button className="btn search__button " name="search__button" id="search__button">
                        Cari Mobil
                    </button>
                    <button className="btn edit__button" name="edit__button" id="edit__button" hidden>Edit</button>
                </section>
            </form>
        </article>
    );
}