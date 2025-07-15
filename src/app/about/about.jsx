
"use client"

import './about.css';

// import required modules
import { Pagination } from 'swiper/modules';
import GlobalApi from '../_utils/GlobalApi';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import DOMPurify from 'dompurify';

import ImgISliderAbout from '../components/imgISliderAbout/imgISliderAbout';
import HexGrid from '../components/test/HexGrid';



export default function About() {


const [open,setOpen] = useState(false)
const [imgIndex,setImgIndex] = useState(0)

const [data,setData] = useState(null)

    useEffect(()=>{
        try{
            async function AboutFunApi() {
                let res = await GlobalApi.AboutApi()
                setData(res.data)
            }
            AboutFunApi()
        }catch(err){
            console.log(err)
        }
    },[])






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
                    <div className="img-container">
                    {slider?.skill_icon && <HexGrid data={slider?.skill_icon} />}
                </div>

                    {
                        slider?.content_about &&
                        <div
                        className="content-about"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(slider?.content_about) 
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
                            className="img-certificate"
                            src={img?.url}
                            alt="Background Image"
                            width={400}
                            height={300}
                            loading="lazy"
                        />
                        );
                    })}
                </div>

                <ImgISliderAbout 
                data={data} 
                imgIndex={imgIndex} 
                setImgIndex={setImgIndex} 
                open={open} 
                setOpen={setOpen}/>
                </SwiperSlide>
                );
            }
            )
        }
        

    </Swiper>
    </div>
)

}
