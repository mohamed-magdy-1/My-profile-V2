
"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../slider/slider.css';
import './about.css';

// import required modules
import { Pagination } from 'swiper/modules';
import GlobalApi from '../_utils/GlobalApi';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import { IoIosArrowBack ,IoIosArrowForward ,IoMdCloseCircleOutline } from "react-icons/io";

export default function About() {

const [open,setOpen] = useState(false)
const [arrayBigImg,setArrayBigImg] = useState([])
const [imgIndex,setImgIndex] = useState(0)
const [data,setData] = useState(null)

    useEffect(()=>{
        try{
            async function AboutFunApi() {
                let res = await GlobalApi.AboutApi()
                setData(res)
            }
            AboutFunApi()
        }catch(err){
            console.log(err)
        }
    },[])


    useEffect(()=>{
        function arrayAllBigImg(){
                    data?.all_about.map((el)=>{
            if(el?.my_images){
                    setArrayBigImg(el?.my_images)
            }
        })
        }
        arrayAllBigImg()
    },[data])


    function prevImg(){
        setImgIndex(imgIndex == 0 ? arrayBigImg.length - 1 : imgIndex - 1)
    }
    function nextImg(){
        setImgIndex(imgIndex == arrayBigImg.length - 1 ? 0 : imgIndex + 1  )
    }


return (
    <div className='about'>
                <Swiper
        direction={'vertical'}
        pagination={{
        clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
    >

        {
            data?.all_about?.map((slider)=>{

            return (
                <SwiperSlide className="about-sc" key={slider.id}>
                    <div className="title-about">{slider.title}</div>
                    {
                        slider?.content_about &&
                        <div
                        className="content-about"
                        dangerouslySetInnerHTML={{
                            __html: slider?.content_about,
                        }}
                        />
                    }
                    <div className="img-container">
                    {slider?.my_images?.map((img, i) => {
                        return (
                        <Image
                        onClick={() => {
                            setOpen(true);
                            setImgIndex(i);
                            }}
                            key={img.id}
                            className="img-1"
                            src={process.env.NEXT_PUBLIC_IMG_URL+img.url}
                            alt="Background Image"
                            layout="fill"
                            quality={75}
                            priority
                        />
                        );
                    })}
                </div>

                <div
                    className="big-img"
                    style={{ display: open ? "flex" : "none" }}
                >
                    <div className='Close' onClick={()=>setOpen(false)}><IoMdCloseCircleOutline/> </div>
                    {arrayBigImg[imgIndex]?.url !== undefined && (
                    <Image
                        className="img-1"
                        src={`${process.env.NEXT_PUBLIC_IMG_URL+arrayBigImg[imgIndex]?.url}`}
                        alt={"bigImg"}
                        layout="fill"
                        quality={75}
                        priority
                        />
                    )}
                    <div className='arrows'>
                    <button onClick={()=> prevImg()}><IoIosArrowBack/></button>
                    <button onClick={()=> nextImg()}><IoIosArrowForward/></button>
                    </div>

                    </div>
                </SwiperSlide>
                );
            }
            )
        }
        

    </Swiper>
    </div>
)

}
