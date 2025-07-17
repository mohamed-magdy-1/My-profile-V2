"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';
import { Pagination } from 'swiper/modules';
import { useEffect, useState, useMemo } from 'react';
import Home from '../home/home';
import About from '../about/about';
import Projects from '../projects/projects';
import Blog from '../blog/blog';
import Contact from '../contact/contact';
import Header from '../components/header/header';


export default function Slider({ home, about, projects, blog, contact }) {
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
      <SwiperSlide><Home data={home} /></SwiperSlide>
      <SwiperSlide><About data={about} /></SwiperSlide>
      <SwiperSlide><Projects data={projects} /></SwiperSlide>
       <SwiperSlide><Blog data={blog} /></SwiperSlide>
      <SwiperSlide><Contact/></SwiperSlide>
            </Swiper>
        </>
    );
}