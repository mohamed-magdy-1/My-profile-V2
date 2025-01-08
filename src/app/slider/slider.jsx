"use client";

import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';
import { Pagination } from 'swiper/modules';
import Header from '../components/header/header';
import { useEffect, useState, useMemo } from 'react';

const DynamicHome = dynamic(() => import('../home/home'), { ssr: false });
const DynamicAbout = dynamic(() => import('../about/about'), { ssr: false });
const DynamicProjects = dynamic(() => import('../projects/projects'), { ssr: false });
const DynamicBlog = dynamic(() => import('../blog/blog'), { ssr: false });
const DynamicContact = dynamic(() => import('../contact/contact'), { ssr: false });

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const textContent = ['home', 'about', 'projects', 'blog', 'contact'];


    const pagination = useMemo(() => ({
        clickable: true,
        renderBullet: (index, className) => {
            return `<span class="${className}">${textContent[index]}</span>`;
        },
    }), []);






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
            <Header title={textContent[currentIndex]} />
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
                <SwiperSlide><DynamicHome /></SwiperSlide>
                <SwiperSlide><DynamicAbout /></SwiperSlide>
                <SwiperSlide><DynamicProjects /></SwiperSlide>
                <SwiperSlide><DynamicBlog /></SwiperSlide> 
                <SwiperSlide><DynamicContact /></SwiperSlide> 
            </Swiper>
        </>
    );
}
