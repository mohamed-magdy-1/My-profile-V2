"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Header from '../components/header/header';
import { useEffect, useState } from 'react';
import Home from '../home/home';
import About from '../about/about';
import Projects from '../projects/projects';
import Blog from '../blog/blog';
import Contact from '../contact/contact';

export default function Slider() {
    let [currentIndex,setCurrentIndex]= useState(0)
    let textContent = ['home','about','projects','blog','Contact']

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            
            return '<span class="' + className + '">' + textContent[index] + '</span>';
            
        },
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("prevIndex", JSON.stringify(currentIndex));
        }, 2000);

        return () => clearTimeout(timer);
    }, [currentIndex]);
    

const handleSlideChange = (swiper)=>{
    setCurrentIndex(swiper.realIndex)
}
const handleInit = (swiper)=>{
    swiper.slideTo(localStorage.getItem("prevIndex"))
}






return (
    <>
    <Header title={textContent[currentIndex]}/>
    <Swiper
        slidesPerView={1}
        spaceBetween={0}
        onInit={handleInit}
        onSlideChange={handleSlideChange}
        loop={true}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
    >
        <SwiperSlide><Home/></SwiperSlide>
        <SwiperSlide>

            <About/>

        </SwiperSlide>
        <SwiperSlide>
            <Projects/>
        </SwiperSlide>
        <SwiperSlide>
            <Blog/>
        </SwiperSlide>
        <SwiperSlide>
            <Contact/>
        </SwiperSlide>
    </Swiper>
    </>
);
}
