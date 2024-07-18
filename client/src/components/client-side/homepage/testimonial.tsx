import { useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import starIcon from '../../../assets/icons/Star 1.png';

const testimonialsData = [
    {
        imgSrc: '../../../assets/images/testimonial/img_testi1.png',
        quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”',
        name: 'John Dee 32, Solo',
    },
    {
        imgSrc: '../../../assets/images/testimonial/img_testi2.png',
        quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”',
        name: 'John Dee 32, Bromo',
    },
    {
        imgSrc: '../../../assets/images/testimonial/img_testi3.png',
        quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”',
        name: 'John Dee 32, Jakarta',
    },
    {
        imgSrc: '../../../assets/images/testimonial/img_testi1.png',
        quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”',
        name: 'John Dee 32, Solo',
    },
    {
        imgSrc: '../../../assets/images/testimonial/img_testi2.png',
        quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”',
        name: 'John Dee 32, Bromo',
    },
    {
        imgSrc: '../../../assets/images/testimonial/img_testi3.png',
        quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”',
        name: 'John Dee 32, Jakarta',
    },
];

export default function Testimonial(): JSX.Element {
    useEffect(() => {
        new Swiper('.mySwiper', {
            modules: [Navigation],
            slidesPerView: 2.5,
            centeredSlides: true,
            loop: true,
            slideToClickedSlide: true,
            spaceBetween: 40,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                },
            },
        });
    }, []);

    return (
        <article className="testimonial" id="testimonial">
            <section className="container d-flex flex-column align-items-center">
                <h2 className="testimonial__title">Testimonial</h2>
                <p className="testimonial__description">Berbagai review positif dari para pelanggan kami</p>
            </section>

            <section className="testimonial__swiper swiper mySwiper">
                <div className="swiper-wrapper">
                    {testimonialsData.map((testi, index) => (
                        <div className="swiper-slide" key={index}>
                            <section className="testimonial__card card border-0">
                                <section className="testimonial__card-body card-body d-flex align-items-center justify-content-center">
                                    <img src={testi.imgSrc} className="testimonial__card-img" alt="" />
                                    <section className="testimonial__card-review">
                                        <section className='d-flex'>
                                            {[...Array(5)].map((_, i) => (
                                                <img key={i} src={starIcon} className="testimonial__card-star" alt="" />
                                            ))}
                                        </section>
                                        <p className="testimonial__card-quote">{testi.quote}</p>
                                        <p className="testimonial__card-name">{testi.name}</p>
                                    </section>
                                </section>
                            </section>
                        </div>
                    ))}
                </div>

                <section className="testimonial__swiper-button-next swiper-button-next"></section>
                <section className="testimonial__swiper-button-prev swiper-button-prev"></section>
            </section>
        </article>
    );
}   